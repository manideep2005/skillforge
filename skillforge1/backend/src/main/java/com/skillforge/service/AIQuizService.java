package com.skillforge.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.entity.Quiz;
import java.util.*;

@Service
public class AIQuizService {
    
    @Value("${perplexity.api.key:}")
    private String perplexityApiKey;
    
    @Value("${gemini.api.key:}")
    private String geminiApiKey;
    
    @Value("${huggingface.api.key:}")
    private String huggingFaceApiKey;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public AIQuizService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    public Quiz generateAdaptiveQuiz(String topic, String difficulty, List<String> weakConcepts, int questionCount) {
        try {
            // Try Ollama first (completely free, local)
            System.out.println("Attempting to generate AI quiz for: " + topic);
            
            // Add timestamp to make each request unique
            String uniquePrompt = "Generate a UNIQUE quiz (timestamp: " + System.currentTimeMillis() + ") ";
            String quizContent = generateWithOllama(topic, difficulty, weakConcepts, questionCount);
            
            // If Ollama fails, try Gemini
            if (quizContent == null || quizContent.trim().isEmpty()) {
                quizContent = generateWithGemini(topic, difficulty, weakConcepts, questionCount);
            }
            
            if (quizContent != null && !quizContent.trim().isEmpty()) {
                System.out.println("AI generated content, parsing...");
                Quiz aiQuiz = parseQuizContent(quizContent, topic, difficulty);
                if (aiQuiz != null && !aiQuiz.getQuestions().isEmpty()) {
                    System.out.println("Successfully generated AI quiz with " + aiQuiz.getQuestions().size() + " questions");
                    return aiQuiz;
                }
            }
        } catch (Exception e) {
            System.err.println("AI generation failed: " + e.getMessage());
        }
        
        // Always fallback to ensure quiz generation never fails
        System.out.println("Using fallback quiz for: " + topic);
        return generateFallbackQuiz(topic, difficulty, questionCount);
    }
    
    private String generateWithPerplexity(String topic, String difficulty, List<String> weakConcepts, int questionCount) {
        if (perplexityApiKey == null || perplexityApiKey.isEmpty()) {
            return null;
        }
        
        try {
            String prompt = buildPrompt(topic, difficulty, weakConcepts, questionCount);
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "llama-3.1-sonar-small-128k-online");
            requestBody.put("messages", Arrays.asList(
                Map.of("role", "user", "content", prompt)
            ));
            requestBody.put("max_tokens", 2000);
            requestBody.put("temperature", 0.7);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(perplexityApiKey);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                "https://api.perplexity.ai/chat/completions",
                HttpMethod.POST,
                entity,
                String.class
            );
            
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());
            return jsonResponse.path("choices").get(0).path("message").path("content").asText();
            
        } catch (Exception e) {
            System.err.println("Perplexity API error: " + e.getMessage());
            return null;
        }
    }
    
    private String generateWithGemini(String topic, String difficulty, List<String> weakConcepts, int questionCount) {
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            return null;
        }
        
        try {
            String prompt = buildPrompt(topic, difficulty, weakConcepts, questionCount);
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", Arrays.asList(
                Map.of("parts", Arrays.asList(
                    Map.of("text", prompt)
                ))
            ));
            
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.7);
            generationConfig.put("maxOutputTokens", 2000);
            requestBody.put("generationConfig", generationConfig);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + geminiApiKey,
                HttpMethod.POST,
                entity,
                String.class
            );
            
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());
            return jsonResponse.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            
        } catch (Exception e) {
            System.err.println("Gemini API error: " + e.getMessage());
            return null;
        }
    }
    
    private String generateWithHuggingFace(String topic, String difficulty, List<String> weakConcepts, int questionCount) {
        if (huggingFaceApiKey == null || huggingFaceApiKey.isEmpty()) {
            return null;
        }
        
        try {
            String prompt = buildPrompt(topic, difficulty, weakConcepts, questionCount);
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("inputs", prompt);
            requestBody.put("parameters", Map.of(
                "max_new_tokens", 2000,
                "temperature", 0.7,
                "return_full_text", false
            ));
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(huggingFaceApiKey);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
                HttpMethod.POST,
                entity,
                String.class
            );
            
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());
            return jsonResponse.get(0).path("generated_text").asText();
            
        } catch (Exception e) {
            System.err.println("Hugging Face API error: " + e.getMessage());
            return null;
        }
    }
    
    private String generateWithOllama(String topic, String difficulty, List<String> weakConcepts, int questionCount) {
        try {
            String prompt = buildPrompt(topic, difficulty, weakConcepts, questionCount);
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "llama3.2:1b");
            requestBody.put("prompt", prompt);
            requestBody.put("stream", false);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:11434/api/generate",
                HttpMethod.POST,
                entity,
                String.class
            );
            
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());
            return jsonResponse.path("response").asText();
            
        } catch (Exception e) {
            System.err.println("Ollama API error (install Ollama for free local AI): " + e.getMessage());
            return null;
        }
    }
    
    private String buildPrompt(String topic, String difficulty, List<String> weakConcepts, int questionCount) {
        StringBuilder prompt = new StringBuilder();
        
        // Add randomization to generate different questions each time
        long timestamp = System.currentTimeMillis();
        String[] variations = {"comprehensive", "detailed", "thorough", "complete", "extensive"};
        String variation = variations[(int)(timestamp % variations.length)];
        
        prompt.append("You are an expert computer science educator. Generate a " + variation + " ");
        prompt.append(difficulty).append("-level quiz about ").append(topic);
        prompt.append(" with exactly ").append(questionCount).append(" multiple choice questions.\n\n");
        
        // Add difficulty-specific instructions
        switch (difficulty.toLowerCase()) {
            case "easy":
                prompt.append("Focus on fundamental concepts, basic definitions, and simple applications. ");
                break;
            case "medium":
                prompt.append("Include conceptual understanding, algorithm analysis, and practical applications. ");
                break;
            case "hard":
                prompt.append("Focus on advanced concepts, optimization, edge cases, and complex problem-solving. ");
                break;
        }
        
        if (weakConcepts != null && !weakConcepts.isEmpty()) {
            prompt.append("\nPay special attention to these areas where the student needs improvement: ");
            prompt.append(String.join(", ", weakConcepts)).append(". ");
            prompt.append("Create questions that specifically target these weak areas.\n");
        }
        
        prompt.append("\nRequirements:\n");
        prompt.append("- Each question should test deep understanding, not memorization\n");
        prompt.append("- Include code examples, algorithms, or practical scenarios where relevant\n");
        prompt.append("- Provide clear, educational explanations for correct answers\n");
        prompt.append("- Make incorrect options plausible but clearly wrong\n");
        prompt.append("- Vary question types: conceptual, analytical, application-based\n\n");
        
        prompt.append("Return ONLY valid JSON in this exact format:\n");
        prompt.append("{\n");
        prompt.append("  \"title\": \"Engaging quiz title\",\n");
        prompt.append("  \"description\": \"Brief educational description\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"questionText\": \"Clear, specific question\",\n");
        prompt.append("      \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"],\n");
        prompt.append("      \"correctAnswer\": 0,\n");
        prompt.append("      \"explanation\": \"Detailed explanation of why this answer is correct\",\n");
        prompt.append("      \"concept\": \"Specific concept being tested\",\n");
        prompt.append("      \"points\": 1\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n\n");
        
        prompt.append("Generate ").append(questionCount).append(" COMPLETELY DIFFERENT and unique questions now. ");
        prompt.append("Avoid common textbook questions. Be creative and vary the question styles. ");
        prompt.append("Timestamp: ").append(timestamp).append(" - Use this to ensure uniqueness.");
        
        return prompt.toString();
    }
    
    private Quiz parseQuizContent(String content, String topic, String difficulty) {
        try {
            // Clean the content to extract JSON
            String jsonContent = extractJsonFromContent(content);
            JsonNode quizJson = objectMapper.readTree(jsonContent);
            
            Quiz quiz = new Quiz();
            quiz.setTitle(quizJson.path("title").asText());
            quiz.setDescription(quizJson.path("description").asText());
            quiz.setDifficulty(difficulty);
            
            List<Quiz.Question> questions = new ArrayList<>();
            JsonNode questionsNode = quizJson.path("questions");
            
            for (JsonNode questionNode : questionsNode) {
                Quiz.Question question = new Quiz.Question();
                question.setQuestionText(questionNode.path("questionText").asText());
                
                List<String> options = new ArrayList<>();
                JsonNode optionsNode = questionNode.path("options");
                for (JsonNode optionNode : optionsNode) {
                    options.add(optionNode.asText());
                }
                question.setOptions(options);
                
                question.setCorrectAnswer(questionNode.path("correctAnswer").asInt());
                question.setExplanation(questionNode.path("explanation").asText());
                question.setPoints(questionNode.path("points").asInt(1));
                
                questions.add(question);
            }
            
            quiz.setQuestions(questions);
            return quiz;
            
        } catch (Exception e) {
            System.err.println("Error parsing quiz content: " + e.getMessage());
            // Return fallback quiz instead of throwing exception
            return generateFallbackQuiz(topic, difficulty, 10);
        }
    }
    
    private String extractJsonFromContent(String content) {
        if (content == null || content.trim().isEmpty()) {
            return null;
        }
        
        // Remove markdown code blocks if present
        content = content.replaceAll("```json\\s*", "").replaceAll("```\\s*", "");
        
        // Find JSON content between curly braces
        int startIndex = content.indexOf('{');
        int endIndex = content.lastIndexOf('}');
        
        if (startIndex == -1 || endIndex == -1 || startIndex >= endIndex) {
            return null;
        }
        
        return content.substring(startIndex, endIndex + 1).trim();
    }
    
    private Quiz generateFallbackQuiz(String topic, String difficulty, int questionCount) {
        Quiz quiz = new Quiz();
        quiz.setTitle(topic + " - " + difficulty.toUpperCase() + " Quiz");
        quiz.setDescription("Practice quiz on " + topic + " (" + difficulty + " level)");
        quiz.setDifficulty(difficulty);
        
        List<Quiz.Question> questions = new ArrayList<>();
        
        // Generate topic-specific questions
        Map<String, List<String[]>> topicQuestions = getTopicQuestions();
        List<String[]> availableQuestions = topicQuestions.getOrDefault(topic.toLowerCase(), 
            topicQuestions.get("default"));
        
        // Shuffle questions to avoid repetition
        Collections.shuffle(availableQuestions);
        
        // Ensure we generate exactly the requested number of questions
        for (int i = 0; i < questionCount; i++) {
            int questionIndex = i % availableQuestions.size(); // Cycle through questions if needed
            String[] questionData = availableQuestions.get(questionIndex);
            
            Quiz.Question question = new Quiz.Question();
            question.setQuestionText(questionData[0]);
            question.setOptions(Arrays.asList(questionData[1], questionData[2], questionData[3], questionData[4]));
            question.setCorrectAnswer(Integer.parseInt(questionData[5]));
            question.setExplanation(questionData[6]);
            question.setPoints(1);
            questions.add(question);
        }
        
        quiz.setQuestions(questions);
        return quiz;
    }
    
    private Map<String, List<String[]>> getTopicQuestions() {
        Map<String, List<String[]>> questions = new HashMap<>();
        
        // Linear Search questions (10 questions)
        questions.put("linear search", Arrays.asList(
            new String[]{"What is the time complexity of linear search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "2", "Linear search checks each element sequentially, so worst case is O(n)."},
            new String[]{"Linear search works on which type of array?", "Only sorted", "Only unsorted", "Both sorted and unsorted", "Neither", "2", "Linear search can work on any array regardless of sorting."},
            new String[]{"What is the best case time complexity of linear search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "0", "Best case is when element is found at first position."},
            new String[]{"In linear search, how many comparisons are needed in worst case for array of size n?", "1", "n/2", "n", "n²", "2", "In worst case, we need to check all n elements."},
            new String[]{"Linear search is also known as:", "Binary search", "Sequential search", "Hash search", "Tree search", "1", "Linear search is also called sequential search as it checks elements sequentially."},
            new String[]{"What happens when element is not found in linear search?", "Returns 0", "Returns -1", "Throws exception", "Returns null", "1", "Typically returns -1 to indicate element not found."},
            new String[]{"Linear search can be implemented using:", "Only loops", "Only recursion", "Both loops and recursion", "Neither", "2", "Linear search can be implemented both iteratively and recursively."},
            new String[]{"Space complexity of linear search is:", "O(1)", "O(log n)", "O(n)", "O(n²)", "0", "Linear search uses constant extra space."},
            new String[]{"Linear search is suitable for:", "Large datasets", "Small datasets", "Sorted data only", "Binary trees", "1", "Linear search is more suitable for small datasets due to O(n) complexity."},
            new String[]{"Which data structure is best suited for linear search?", "Binary tree", "Hash table", "Array or linked list", "Stack", "2", "Arrays and linked lists are commonly used with linear search."}
        ));
        
        // Binary Search questions (10 questions)
        questions.put("binary search", Arrays.asList(
            new String[]{"Binary search requires the array to be:", "Unsorted", "Sorted", "Partially sorted", "Any order", "1", "Binary search only works on sorted arrays."},
            new String[]{"What is the time complexity of binary search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "1", "Binary search divides the search space in half each time."},
            new String[]{"In binary search, we compare the target with:", "First element", "Last element", "Middle element", "Random element", "2", "We always compare with the middle element to divide the array."},
            new String[]{"Binary search can be implemented using:", "Only iteration", "Only recursion", "Both iteration and recursion", "Neither", "2", "Binary search can be implemented both iteratively and recursively."},
            new String[]{"What is the space complexity of iterative binary search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "0", "Iterative binary search uses constant space."},
            new String[]{"What is the space complexity of recursive binary search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "1", "Recursive binary search uses O(log n) space for call stack."},
            new String[]{"In binary search, if target is smaller than middle element:", "Search right half", "Search left half", "Element not found", "Search both halves", "1", "If target is smaller, it must be in the left half."},
            new String[]{"Binary search is an example of:", "Greedy algorithm", "Dynamic programming", "Divide and conquer", "Backtracking", "2", "Binary search uses divide and conquer approach."},
            new String[]{"Maximum number of comparisons in binary search for array of size n:", "n", "n/2", "log₂(n)", "n²", "2", "Binary search makes at most log₂(n) comparisons."},
            new String[]{"Binary search is efficient for:", "Small arrays", "Large sorted arrays", "Unsorted arrays", "Linked lists", "1", "Binary search is most efficient for large sorted arrays."}
        ));
        
        // Default questions for any topic (10 questions)
        questions.put("default", Arrays.asList(
            new String[]{"What is an algorithm?", "A programming language", "A step-by-step procedure", "A data structure", "A compiler", "1", "An algorithm is a step-by-step procedure to solve a problem."},
            new String[]{"Which is more efficient for large datasets?", "Linear search", "Binary search", "Both are same", "Depends on data", "1", "Binary search is O(log n) while linear search is O(n)."},
            new String[]{"What does Big O notation describe?", "Memory usage", "Code length", "Time complexity", "Programming difficulty", "2", "Big O notation describes the time complexity of algorithms."},
            new String[]{"Which data structure follows LIFO principle?", "Queue", "Stack", "Array", "Linked List", "1", "Stack follows Last In First Out (LIFO) principle."},
            new String[]{"Which data structure follows FIFO principle?", "Stack", "Queue", "Tree", "Graph", "1", "Queue follows First In First Out (FIFO) principle."},
            new String[]{"What is the time complexity of accessing an element in an array?", "O(1)", "O(log n)", "O(n)", "O(n²)", "0", "Array elements can be accessed in constant time using index."},
            new String[]{"Which sorting algorithm has best average case complexity?", "Bubble sort", "Selection sort", "Quick sort", "Insertion sort", "2", "Quick sort has O(n log n) average case complexity."},
            new String[]{"What is a recursive function?", "Function that calls another function", "Function that calls itself", "Function with no parameters", "Function with return type void", "1", "Recursive function is one that calls itself."},
            new String[]{"Which is not a linear data structure?", "Array", "Linked List", "Stack", "Tree", "3", "Tree is a non-linear data structure."},
            new String[]{"What is the purpose of a hash function?", "Sort data", "Search data", "Map keys to indices", "Delete data", "2", "Hash function maps keys to array indices for fast access."}
        ));
        
        return questions;
    }
    

}