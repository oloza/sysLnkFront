import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link,AllLink } from './../model/link';
// import { Observable, catchError, tap } from 'rxjs';

import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LinkService {
  
  baseURL:string='http://localhost:4010/api';

  constructor(private http: HttpClient) { }
 
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
}

  async getLinks() {
    const res = await this.http.get<any>(`${this.baseURL}/getLinks`)
      .toPromise();
    const data = <Link[]>res.data;
    return data;
    }

    getAllLinks(): Observable<AllLink> {
      return this.http.get<AllLink>(`${this.baseURL}/getLinks`)
      // .pipe(
      //     tap(lnk => console.log("Number of articles: " + lnk)
      //     ),
      //     catchError(this.handleError)
      // );
  }


  createLink(link: Link): Observable<number> {
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.post<Link>( `${this.baseURL}/newLink`, link, {
        headers: httpHeaders,
        observe: 'response'
    }
    ).pipe(
        map(res => res.status),
        catchError(this.handleError)
    );
}

// updateArticle(article: Article): Observable<number> {
//   let httpHeaders = new HttpHeaders({
//       'Content-Type': 'application/json'
//   });
//   return this.http.put<Article>(this.articleUrl + "/" + article.id, article, {
//       headers: httpHeaders,
//       observe: 'response'
//   }
//   ).pipe(
//       map(res => res.status),
//       catchError(this.handleError)
//   );
// }



updateLink(_id:string,link:Link): Observable<number> {
  
  let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });

  return this.http.put<Link>( `${this.baseURL}/updateLink/`+ _id, link, {
      headers: httpHeaders,
      observe: 'response'
  }
  ).pipe(
      map(res => res.status),
      catchError(this.handleError)
  );
}

//Delete article	
deleteLink(_id: string): Observable<number> {
  return this.http.delete<number>(`${this.baseURL}/deleteLink/`+ _id).pipe(
      tap(status => console.log("status: " + status)),
      catchError(this.handleError)
  );
}

}
