import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../../model/province.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CardViewPost } from '../../model/cardViewPost.model';
import { Feedback } from '../../model/feedback.model';
import { SearchHistory } from '../../model/searchHistory.model';
import { Post } from 'src/app/model/post.model';
import { Tag } from 'src/app/model/tag.model';
import { PostCategory } from 'src/app/model/postCategory.model';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { Location } from 'src/app/model/location.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  HOST: String = 'http://localhost:7979/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Get list 63 VietNam's provinces
   * @name getListProvinces
   * @author phieu-th
   */
  getListProvinces(): Observable<ProvinceCity[]> {
    return this.http.get<any>(this.HOST + 'api/provinces/').pipe(map((res: any) => {
      const provinces: ProvinceCity[] = res.data.map((resItem) => {
        const province = new ProvinceCity(
          resItem._id,
          resItem.provinceId,
          resItem.provinceName,
          resItem.districts,
          resItem.regionOfCountry,
          resItem.mapId
        );

        return province;
      });

      return provinces;
    }));
  }

  /**
   * Get all post is approveded and map to card view
   * @name getCardViewPost
   * @author phieu-th
   */
  getCardViewPost(): Observable<CardViewPost[]> {
    return this.http.get<any>(this.HOST + 'api/cardview-post').pipe(map((res: any) => {
      const cardViewPosts: CardViewPost[] = res.data.map((resItem) => {
        const cardViewPost: CardViewPost = new CardViewPost(
          resItem._id,
          resItem.title,
          resItem.cover,
          resItem.categories,
          resItem.createdTime,
          resItem.description,
          resItem.location
        );
        return cardViewPost;
      });
      return cardViewPosts;
    }));
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all Tag from Tags collection
     */
  getListTags() {
    return this.http.get<{ message: string; data: Tag[] }>(this.HOST + 'api/tags');
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all Location from Locations collection
     */
  getListLocations() {
    return this.http.get<{ message: string; data: Location[] }>(this.HOST + 'api/locations');
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all ProvinceCity from ProvinceCity collection
     */
  getListProvinceCity() {
    return this.http.get<{ message: string; data: ProvinceCity[] }>(this.HOST + 'api/province-city');
  }

  /**
     * @author Thong
     * @description send get-request to node server for list all PostCategory from PostCategories collection
     */
  getListPostCategories() {
    return this.http.get<{ message: string; data: PostCategory[] }>(this.HOST + 'api/post-categories');
  }

  /**
   * @author Thong
   * @description send get-request to node server for listAllPost from Posts collection
   */
  getListPosts() {
    return this.http.get<{ message: string; data: Post[] }>(this.HOST + 'api/posts');
  }

  /**
   * @author Thong
   * @description send get-request to query one post by Id
   */
  getOnePost(postId: string) {
    const listParams = new HttpParams().set('postId', postId);
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ message: string, data: Post }>(this.HOST + 'api/post', { headers: this.httpOptions.headers, params: listParams });
  }

  /**
   * @author Thong
   * @description send POST-request to node server for store new post to Posts collection
   */
  postOnePost(newPost: Post) {
    return this.http.post<{ message: string }>(this.HOST + 'api/posts', newPost);
  }

  /**
   * @author Thong
   * @param {File} image
   * @description send a POST request to upload an image to server
   */
  uploadImage(image: File) {
    // convert to FormData before send to multer
    const uploadImage = new FormData();
    uploadImage.append('image', image);
    return this.http.post<{ message: string, imageUrl: string }>(this.HOST + 'api/upload-image', uploadImage);
  }

  /**
   * POST a feedback
   * @name postFeedback
   * @author phieu-th
   * @param feedback
   */
  postFeedback(feedback: Feedback): Observable<any> {
    return this.http.post<any>(this.HOST + 'api/create-feedback', feedback, this.httpOptions);
  }

  /**
   * POST a key word be search by user
   * @name postSearchHistory
   * @author phieu-th
   * @param searchHistory
   */
  postSearchHistory(searchHistory: SearchHistory): Observable<any> {
    return this.http.post<any>(this.HOST + 'api/create-search-history', searchHistory, this.httpOptions);
  }

  /**
   * GET data was search from startDate to endDate
   * @name getReportBySearchKeyWordData
   * @author phieu-th
   * @param startDate
   * @param endDate
   */
  getReportBySearchKeyWordData(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams().set('startDate', startDate.toString())
      .set('endDate', endDate.toString());

    return this.http.get<any>(this.HOST + 'api/report/searchkeyword', { headers: this.httpOptions.headers, params: params });
  }

  getPostsByManager(): Observable<any> {
    return this.http.get<any>(this.HOST + 'manager/posts');
  }
}
