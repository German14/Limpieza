import {Component, Input, OnInit, HostListener, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {DataService} from "../service/service";
import {isNullOrUndefined} from '@swimlane/ngx-datatable/release/utils';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit{

  loading=false;
  response;
  disabled=true;

  formGroup = this.fb.group({
    files: []
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: DataService) {}


  ngOnInit(): void {
    console.log(this.formGroup.get('files'))

  }

  fileData: File = null;

  onFileChange(event) {
    const reader = new FileReader();


    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        if(file.name.split('.')[1]==='zip'){
          this.disabled=false;
        }
        this.fileData = <File>event.target.files[0];

        this.onSubmit(file);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
   }


  onSubmit(data){
    this.service.sendFile(data).subscribe(
      (res) => {
        if (res) {
          if(!isNullOrUndefined(res)){
            this.loading=true;
            this.response= res;
          }
        }else{
          this.loading=false;
          this.response= res;
        }

      },
      (err) => {
        console.log(err);
      }
    );
    console.log(data)
  }
}
