import {Component, Input, OnInit, HostListener, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {DataService} from "../service/service";
import {isNullOrUndefined} from '@swimlane/ngx-datatable/release/utils';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  loading=false;
  response;

  formGroup = this.fb.group({
    files: [null, '']
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: DataService) {}

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        this.onSubmit(file)

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
  onSubmit(data){
    this.service.sendFile(this.formGroup.get('files').value).subscribe(
      (res) => {
        if (res) {
          if(!isNullOrUndefined(res)){
            this.loading=true;
            this.response= res;

          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(data)
  }
}
