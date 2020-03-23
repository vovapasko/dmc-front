import {Component, OnInit, ViewChild} from '@angular/core';

import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {UserService} from '../../../core/services/user.service';
import {AuthenticationService} from '../../../core/services/auth.service';
import {Rations} from '../../../core/constants/rations';
import images from '../../../core/constants/images';

@Component({
    selector: 'app-imagecrop',
    templateUrl: './imagecrop.component.html',
    styleUrls: ['./imagecrop.component.scss']
})

/**
 * Image-crop component - handling the image-crop with sidebar and content
 */
export class ImagecropComponent implements OnInit {

    defaultImage = images.defaultAvatar;
    fileToUpload: File = null;
    avatar = null;
    // bread crumb items
    breadCrumbItems: Array<{}>;
    // tslint:disable-next-line: member-ordering
    availableRations = Rations;
    aspectRatio: Rations = 4 / 3;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    width = 256;
    height = 256;

    constructor(private userService: UserService, private authService: AuthenticationService) {
    }

    @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'Forms', path: '/'}, {label: 'Image Crop', path: '/', active: true}];
    }

    /**
     * Crop image
     * @param event image passed
     */
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.avatar = event.file;
        this.width = event.width;
        this.height = event.height;
    }

    /**
     * Rotate image left
     */
    rotateLeft() {
        this.imageCropper.rotateLeft();
    }

    /**
     * Rotate image right
     */
    rotateRight() {
        this.imageCropper.rotateRight();
    }

    /**
     * Change aspect ratio
     */
    changeAspectRatio(ration: Rations) {
        this.aspectRatio = ration;
    }

    /**
     * Flip image horizontal
     */
    flipHorizontal() {
        this.imageCropper.flipHorizontal();
    }

    /**
     * Flip image dmc
     */
    flipVertical() {
        this.imageCropper.flipVertical();
    }

    /**
     * Upload new image to cropper
     */
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    /**
     * Save and update user avatar
     */
    save() {
        // TODO CHANGE THIS COMPONENT TO WORK WITH SOMETHING ELSE THAN PROFILE
        const currentUser = this.authService.currentUser();
        const avatar = new File([this.avatar], 'image.png', {type: this.avatar.type});
        const {first_name, last_name} = currentUser;
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        this.userService
            .updateProfile({data: formData})
            .subscribe(
                response => console.log(response),
                error => console.log(error)
            );
    }
}
