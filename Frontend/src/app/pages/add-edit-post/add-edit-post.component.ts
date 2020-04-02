
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostService, UploadService, ApiService } from '@shared/service';
import { Posts } from '@models';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.css']
})
export class AddEditPostComponent implements OnInit, OnDestroy {

  articleForm: FormGroup;
  isubmitted = false;
  isEdit = false;
  sendError = null;
  articlesToEdit: any = null;
  error: boolean;
  private unsubscribe: Subject<void> = new Subject();
  fileContentError: string;
  fileError: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private uploadservic: UploadService,
    public config: ApiService
  ) { }
  @ViewChild('inputImage', { static: false }) inputImage;
  @ViewChild('inputContentImage', { static: false }) inputContentImage;

  ngOnInit(): void {

    this.articlePost();
    this.getfromParam();
  }

  articlePost() {

    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      readTime: ['', [Validators.required]],
      preview: ['', [Validators.required]],
      tag: ['', []],
      image: [null, []],
      imageLink: ['', Validators.required],
      imagesContent: [[], []]
    });

  }


  getfromParam() {
    this.route.params.subscribe(params => {
      if (params['id']) {

        this.isEdit = true;
        this.postService.updatePostbyId(params['id']).pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            console.log(res);
            this.articlesToEdit = res;

            this.articleForm.patchValue({ title: this.articlesToEdit.title });
            this.articleForm.patchValue({ content: this.articlesToEdit.content });
            this.articleForm.patchValue({ readTime: this.articlesToEdit.readTime });
            this.articleForm.patchValue({ preview: this.articlesToEdit.preview });
            this.articleForm.patchValue({ tag: this.articlesToEdit.tag.toString() });
            this.articleForm.patchValue({ imageLink: this.articlesToEdit.imageLink });
            this.articleForm.patchValue({ imagesContent: this.articlesToEdit.imagesContent || [] });
          }, error => {
            // this.error = error.error.message;
          }
          );
      }
    });
  }


  fileChangeEvent(isContentImage: boolean) {

    this.fileContentError = null;
    let image: File;
    const fi = isContentImage ? this.inputContentImage.nativeElement : this.inputImage.nativeElement;
    if (fi.files && fi.files[0]) {
      image = fi.files[0];
    }

    if (image.size > 2000000) {
      isContentImage ? this.fileContentError = 'File is too large' : this.fileError = 'File is too large';

      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    const folder = isContentImage ? 'blogArticleContent' : 'blog';

    this.uploadservic.uplodImage(formData, folder).subscribe(
      response => {
        console.log(response);
        if (isContentImage) {
          const imagesContent = this.articleForm.value.imagesContent || [];
          imagesContent.push({ imageLink: response.data });
          this.articleForm.patchValue({
            imagesContent
          });
        } else {
          this.articleForm.patchValue({
            imageLink: response.data
          });
        }
      },
      error => {
        // this.loading = false;
        if (isContentImage) {
          this.fileContentError = error.error.message;
        } else {
          this.fileError = error.error.message;

        }
      });
  }


  removeContentImage(imageLink) {
    const imagesContent = this.articleForm.value.imagesContent;
    imagesContent.splice(imagesContent.findIndex(x => x.imageLink === imageLink), 1);
    this.articleForm.patchValue({
      imagesContent
    });
  }


  onSubmitArticles() {

    this.isubmitted = true;
    if (this.articleForm.invalid) {
      return;
    }

    if (this.isEdit) {

      this.postService.editPost(this.articleForm.value, this.articlesToEdit._id).subscribe(res => {
        console.log(res);
        this.router.navigate(['/my-profile']);
      }, error => {
        this.sendError = error.error.message;
      });

    } else {
      this.postService.createPost(this.articleForm.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['/my-profile']);
      }, error => {
        console.log(error);
        this.sendError = error.error.message;

      });
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
