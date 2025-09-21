import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  private jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';
  private githubUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return forkJoin({
      posts: this.http.get<any[]>(`${this.jsonPlaceholderUrl}/posts`),
      users: this.http.get<any[]>(`${this.jsonPlaceholderUrl}/users`),
      githubRepos: this.http.get<any>(`${this.githubUrl}/search/repositories?q=tutorial+javascript+python+react&sort=stars&per_page=20`)
    }).pipe(
      map(({ posts, users, githubRepos }: any) => {
        const courses = posts.slice(0, 15).map((post: any, index: number) => {
          const user: any = users[index % users.length];
          const categories = ['Programming', 'Web Development', 'Data Science', 'Mobile Development', 'AI/ML'];
          const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
          const durations = ['2 hours', '4 hours', '6 hours', '8 hours', '12 hours'];
          
          return {
            id: post.id,
            title: this.formatCourseTitle(post.title),
            description: post.body.substring(0, 120) + '...',
            instructor: user.name,
            instructorEmail: user.email,
            category: categories[index % categories.length],
            difficulty: difficulties[index % difficulties.length],
            duration: durations[index % durations.length],
            rating: (4.0 + Math.random() * 1).toFixed(1),
            students: Math.floor(Math.random() * 5000) + 500,
            price: index % 3 === 0 ? 'Free' : `$${Math.floor(Math.random() * 100) + 29}`,
            image: `https://picsum.photos/300/200?random=${post.id}`,
            progress: Math.floor(Math.random() * 100),
            modules: Math.floor(Math.random() * 15) + 5,
            lastUpdated: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          };
        });

        const githubCourses = githubRepos.items.slice(0, 10).map((repo: any) => ({
          id: `gh-${repo.id}`,
          title: this.formatRepoTitle(repo.name),
          description: repo.description || 'Learn programming with this comprehensive tutorial repository.',
          instructor: repo.owner.login,
          instructorEmail: `${repo.owner.login}@github.com`,
          category: 'Programming',
          difficulty: repo.stargazers_count > 1000 ? 'Advanced' : repo.stargazers_count > 100 ? 'Intermediate' : 'Beginner',
          duration: '6 hours',
          rating: Math.min(5.0, (repo.stargazers_count / 1000 + 3.5)).toFixed(1),
          students: repo.stargazers_count,
          price: 'Free',
          image: `https://picsum.photos/300/200?random=${repo.id}`,
          progress: 0,
          modules: Math.floor(Math.random() * 10) + 8,
          lastUpdated: repo.updated_at.split('T')[0],
          githubUrl: repo.html_url,
          language: repo.language || 'Multiple'
        }));

        return [...courses, ...githubCourses];
      })
    );
  }

  searchContent(query: string): Observable<any> {
    return forkJoin({
      githubRepos: this.http.get<any>(`${this.githubUrl}/search/repositories?q=${query}+tutorial&sort=stars&per_page=15`),
      videos: this.getVideos(query),
      articles: this.getArticles(query)
    }).pipe(
      map(({ githubRepos, videos, articles }: any) => ({
        repositories: this.formatGitHubRepos(githubRepos.items || []),
        videos: videos,
        articles: articles
      }))
    );
  }

  private getVideos(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.jsonPlaceholderUrl}/posts`).pipe(
      map((posts: any[]) => posts.slice(0, 8).map((post: any) => ({
        id: `yt-${post.id}`,
        title: `${query} Tutorial - ${post.title}`,
        description: post.body.substring(0, 100) + '...',
        thumbnail: `https://picsum.photos/320/180?random=${post.id + 1000}`,
        duration: `${Math.floor(Math.random() * 30) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        views: `${Math.floor(Math.random() * 500) + 50}K views`,
        channel: `${query} Academy`,
        uploadDate: `${Math.floor(Math.random() * 30) + 1} days ago`
      })))
    );
  }

  private getArticles(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.jsonPlaceholderUrl}/posts`).pipe(
      map((posts: any[]) => posts.slice(0, 5).map((post: any, index: number) => ({
        id: `dev-${post.id}`,
        title: `Complete ${query} Guide: ${post.title}`,
        description: post.body.substring(0, 120) + '...',
        author: `${query}Developer${index + 1}`,
        readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
        reactions: Math.floor(Math.random() * 100) + 20,
        comments: Math.floor(Math.random() * 20) + 5,
        publishDate: `${Math.floor(Math.random() * 30) + 1} days ago`,
        tags: [query.toLowerCase(), 'webdev', 'tutorial', 'beginners'],
        coverImage: `https://picsum.photos/400/200?random=${post.id + 2000}`
      })))
    );
  }

  private formatGitHubRepos(repos: any[]): any[] {
    return repos.slice(0, 10).map((repo: any) => ({
      id: `search-${repo.id}`,
      name: repo.name,
      description: repo.description || 'No description available',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      lastUpdated: repo.updated_at.split('T')[0],
      owner: repo.owner.login,
      url: repo.html_url,
      topics: repo.topics || []
    }));
  }

  private formatCourseTitle(title: string): string {
    const techWords = ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML', 'API', 'Database', 'Algorithm', 'Framework'];
    const words = title.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    
    if (Math.random() > 0.7) {
      const techWord = techWords[Math.floor(Math.random() * techWords.length)];
      words.splice(1, 0, techWord);
    }
    
    return words.join(' ').substring(0, 50);
  }

  private formatRepoTitle(name: string): string {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') + ' Tutorial';
  }
}