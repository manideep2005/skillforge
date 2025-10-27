import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  private apiKey = 'AIzaSyDummy_Key_Replace_With_Real'; // Replace with actual API key
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchCourses(query: string, maxResults: number = 20): Observable<any[]> {
    const url = `${this.baseUrl}/search`;
    const params = {
      part: 'snippet',
      q: `${query} tutorial course`,
      type: 'video',
      maxResults: maxResults.toString(),
      key: this.apiKey,
      order: 'relevance',
      videoDuration: 'medium'
    };

    return this.http.get<any>(url, { params }).pipe(
      map(response => this.transformVideosToCoursesFormat(response.items))
    );
  }

  getChannelInfo(channelId: string): Observable<any> {
    const url = `${this.baseUrl}/channels`;
    const params = {
      part: 'snippet,statistics',
      id: channelId,
      key: this.apiKey
    };

    return this.http.get<any>(url, { params });
  }

  private transformVideosToCoursesFormat(videos: any[]): any[] {
    return videos.map(video => ({
      id: video.id.videoId,
      title: this.cleanTitle(video.snippet.title),
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
      instructor: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
      category: this.extractCategory(video.snippet.title),
      level: this.extractLevel(video.snippet.title),
      duration: this.estimateDuration(),
      rating: this.generateRating(),
      students: this.generateStudentCount(),
      price: this.generatePrice(),
      videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`
    }));
  }

  private cleanTitle(title: string): string {
    return title.replace(/[\[\]()]/g, '').trim();
  }

  private extractCategory(title: string): string {
    const categories = ['JavaScript', 'Python', 'React', 'Angular', 'Node.js', 'CSS', 'HTML', 'Java', 'C++', 'Web Development'];
    const found = categories.find(cat => title.toLowerCase().includes(cat.toLowerCase()));
    return found || 'Programming';
  }

  private extractLevel(title: string): string {
    if (title.toLowerCase().includes('beginner') || title.toLowerCase().includes('basic')) return 'Beginner';
    if (title.toLowerCase().includes('advanced') || title.toLowerCase().includes('expert')) return 'Advanced';
    return 'Intermediate';
  }

  private estimateDuration(): string {
    const durations = ['2h 30m', '4h 15m', '6h 45m', '8h 20m', '3h 10m', '5h 30m'];
    return durations[Math.floor(Math.random() * durations.length)];
  }

  private generateRating(): number {
    return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
  }

  private generateStudentCount(): number {
    return Math.floor(Math.random() * 5000) + 100;
  }

  private generatePrice(): number {
    const prices = [0, 29.99, 49.99, 79.99, 99.99, 129.99];
    return prices[Math.floor(Math.random() * prices.length)];
  }

  // Fallback data when API is not available
  getMockCourses(): Observable<any[]> {
    const mockCourses = [
      {
        id: '1',
        title: 'Complete JavaScript Course 2024',
        description: 'Learn JavaScript from scratch with modern ES6+ features',
        thumbnail: 'https://picsum.photos/seed/js1/400/225',
        instructor: 'Tech Academy',
        category: 'JavaScript',
        level: 'Beginner',
        duration: '12h 30m',
        rating: 4.8,
        students: 2340,
        price: 79.99,
        videoUrl: '#'
      },
      {
        id: '2',
        title: 'React Development Masterclass',
        description: 'Build modern web applications with React and Redux',
        thumbnail: 'https://picsum.photos/seed/react1/400/225',
        instructor: 'Code Masters',
        category: 'React',
        level: 'Intermediate',
        duration: '15h 45m',
        rating: 4.9,
        students: 1890,
        price: 99.99,
        videoUrl: '#'
      },
      {
        id: '3',
        title: 'Python for Data Science',
        description: 'Master Python programming for data analysis and machine learning',
        thumbnail: 'https://picsum.photos/seed/python1/400/225',
        instructor: 'Data Science Pro',
        category: 'Python',
        level: 'Intermediate',
        duration: '18h 20m',
        rating: 4.7,
        students: 3210,
        price: 129.99,
        videoUrl: '#'
      },
      {
        id: '4',
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js and Express',
        thumbnail: 'https://picsum.photos/seed/node1/400/225',
        instructor: 'Backend Expert',
        category: 'Node.js',
        level: 'Advanced',
        duration: '10h 15m',
        rating: 4.6,
        students: 1560,
        price: 89.99,
        videoUrl: '#'
      },
      {
        id: '5',
        title: 'CSS Grid and Flexbox Mastery',
        description: 'Master modern CSS layout techniques',
        thumbnail: 'https://picsum.photos/seed/css1/400/225',
        instructor: 'Design Guru',
        category: 'CSS',
        level: 'Beginner',
        duration: '6h 30m',
        rating: 4.5,
        students: 890,
        price: 49.99,
        videoUrl: '#'
      },
      {
        id: '6',
        title: 'Angular Complete Guide',
        description: 'Build enterprise applications with Angular framework',
        thumbnail: 'https://picsum.photos/seed/angular1/400/225',
        instructor: 'Framework Pro',
        category: 'Angular',
        level: 'Intermediate',
        duration: '20h 10m',
        rating: 4.8,
        students: 2100,
        price: 109.99,
        videoUrl: '#'
      }
    ];

    return new Observable(observer => {
      observer.next(mockCourses);
      observer.complete();
    });
  }
}