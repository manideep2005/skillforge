import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalApiService } from '../services/external-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="search-header">
        <div class="container">
          <div class="search-bar">
            <div class="search-input-group">
              <i class="fas fa-search search-icon"></i>
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                (keyup.enter)="performSearch()"
                placeholder="Search for Node.js, Spring, React..."
                class="search-input">
              <button class="search-btn" (click)="performSearch()">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          <div class="search-filters" *ngIf="searchResults">
            <button class="filter-btn" [class.active]="activeFilter === 'all'" (click)="setFilter('all')">
              All ({{getTotalResults()}})
            </button>
            <button class="filter-btn" [class.active]="activeFilter === 'repositories'" (click)="setFilter('repositories')">
              Code ({{searchResults.repositories?.length || 0}})
            </button>
            <button class="filter-btn" [class.active]="activeFilter === 'videos'" (click)="setFilter('videos')">
              Videos ({{searchResults.videos?.length || 0}})
            </button>
            <button class="filter-btn" [class.active]="activeFilter === 'articles'" (click)="setFilter('articles')">
              Articles ({{searchResults.articles?.length || 0}})
            </button>
          </div>
        </div>
      </div>

      <div class="search-content" *ngIf="searchResults">
        <div class="container">
          <div class="results-header">
            <h2>Learning Resources for "{{searchQuery}}"</h2>
            <p>{{getTotalResults()}} resources found</p>
          </div>

          <!-- GitHub Repositories -->
          <div class="results-section" *ngIf="shouldShowSection('repositories')">
            <h3 class="section-title">
              <i class="fab fa-github"></i>
              Code Examples & Projects
            </h3>
            <div class="repo-grid">
              <div class="repo-card" *ngFor="let repo of searchResults.repositories">
                <div class="repo-header">
                  <h4>{{repo.name}}</h4>
                  <div class="repo-stats">
                    <span class="stat"><i class="fas fa-star"></i> {{repo.stars}}</span>
                    <span class="stat"><i class="fas fa-code-branch"></i> {{repo.forks}}</span>
                  </div>
                </div>
                <p class="repo-description">{{repo.description}}</p>
                <div class="repo-meta">
                  <span class="language" *ngIf="repo.language">{{repo.language}}</span>
                  <span class="updated">Updated {{repo.lastUpdated}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Tutorials -->
          <div class="results-section" *ngIf="shouldShowSection('videos')">
            <h3 class="section-title">
              <i class="fab fa-youtube"></i>
              Video Tutorials
            </h3>
            <div class="video-grid">
              <div class="video-card" *ngFor="let video of searchResults.videos">
                <div class="video-thumbnail">
                  <img [src]="video.thumbnail" [alt]="video.title">
                  <div class="video-duration">{{video.duration}}</div>
                  <div class="play-overlay">
                    <i class="fas fa-play"></i>
                  </div>
                </div>
                <div class="video-info">
                  <h4>{{video.title}}</h4>
                  <p class="video-channel">{{video.channel}}</p>
                  <div class="video-meta">
                    <span>{{video.views}}</span>
                    <span>{{video.uploadDate}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Articles -->
          <div class="results-section" *ngIf="shouldShowSection('articles')">
            <h3 class="section-title">
              <i class="fas fa-newspaper"></i>
              Articles & Guides
            </h3>
            <div class="article-grid">
              <div class="article-card" *ngFor="let article of searchResults.articles">
                <div class="article-image">
                  <img [src]="article.coverImage" [alt]="article.title">
                </div>
                <div class="article-content">
                  <h4>{{article.title}}</h4>
                  <p>{{article.description}}</p>
                  <div class="article-meta">
                    <span class="author">{{article.author}}</span>
                    <span class="read-time">{{article.readTime}}</span>
                  </div>
                  <div class="article-tags">
                    <span class="tag" *ngFor="let tag of article.tags.slice(0, 3)">#{{tag}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="loading-container" *ngIf="isLoading">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Searching for "{{searchQuery}}"...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      min-height: 100vh;
      background: #f8fafc;
    }
    
    .search-header {
      background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
      color: white;
      padding: 40px 0;
    }
    
    .search-input-group {
      position: relative;
      display: flex;
      align-items: center;
      max-width: 600px;
      margin: 0 auto 30px;
    }
    
    .search-input {
      flex: 1;
      padding: 16px 60px 16px 50px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      background: white;
    }
    
    .search-icon {
      position: absolute;
      left: 20px;
      color: #64748b;
      z-index: 2;
    }
    
    .search-btn {
      position: absolute;
      right: 8px;
      padding: 12px 16px;
      background: #0ea5e9;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    
    .search-filters {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 8px 16px;
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .filter-btn.active {
      background: white;
      color: #0ea5e9;
    }
    
    .search-content {
      padding: 40px 0;
    }
    
    .results-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      color: #1e293b;
      margin-bottom: 24px;
    }
    
    .repo-grid, .video-grid, .article-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    
    .repo-card, .video-card, .article-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }
    
    .repo-card:hover, .video-card:hover, .article-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    
    .video-thumbnail {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    
    .video-thumbnail img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    
    .play-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: rgba(0,0,0,0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }
    
    .loading-spinner i {
      font-size: 48px;
      color: #0ea5e9;
      margin-bottom: 16px;
    }
  `]
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any = null;
  isLoading: boolean = false;
  activeFilter: string = 'all';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private externalApiService: ExternalApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.performSearch();
      }
    });
  }

  performSearch() {
    if (!this.searchQuery.trim()) return;
    
    this.isLoading = true;
    this.router.navigate([], { queryParams: { q: this.searchQuery } });
    
    this.externalApiService.searchContent(this.searchQuery).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.isLoading = false;
      }
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  shouldShowSection(section: string): boolean {
    return this.activeFilter === 'all' || this.activeFilter === section;
  }

  getTotalResults(): number {
    if (!this.searchResults) return 0;
    return (this.searchResults.repositories?.length || 0) +
           (this.searchResults.videos?.length || 0) +
           (this.searchResults.articles?.length || 0);
  }
}