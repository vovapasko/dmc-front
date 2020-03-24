import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrasRoutingModule } from './extras-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import {NgbAlertModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';

import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { FaqsComponent } from './faqs/faqs.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ProfileComponent, TimelineComponent, InvoiceComponent, PricingComponent, GalleryComponent, SitemapComponent, FaqsComponent],
    imports: [
        CommonModule,
        ExtrasRoutingModule,
        UIModule,
        NgbProgressbarModule,
        NgbTabsetModule,
        LightboxModule,
        ReactiveFormsModule,
        NgbAlertModule
    ]
})
export class ExtrasModule { }
