import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(input:HTMLInputElement | null) {
    if(input!==null && input.files){
      const self = this;
      const formData = new FormData();
      for (var i = 0; i < input.files.length; i++) { 
        formData.append("files",input.files[i]);
      }
  
      return self.http
      .post<{fileName:string}>(`${environment.apiEndpoint}/api/file-upload-service/v1/upload-file/test/one`, formData, {});
    }
    throw throwError('no file');  
  }
}
