import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private apiKey = 'AIzaSyASez40TCMxX2SAdTHLyuvWHeHybbp6FgQ';

  constructor(private http: HttpClient) {}

  generateText(prompt: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers });
  }
}
