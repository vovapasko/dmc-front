import {Component, ElementRef, OnInit} from '@angular/core';

import {ChartType, RevenueData, UserBalance, Widget} from './default.model';
import {widgetData, salesMixedChart, revenueRadialChart, userBalanceData, revenueData} from './data';

@Component({
    selector: 'app-ecommerce',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})

/**
 * Dashboard-1 component: handling the dashboard-1 with sidebar and content
 */
export class EcommerceComponent implements OnInit {

    // bread crumb items
    breadCrumbItems: Array<{}>;

    widgetData: Widget[];
    userBalanceData: UserBalance[];
    revenueData: RevenueData[];
    salesMixedChart: ChartType;
    revenueRadialChart: ChartType;
    currentDate = new Date();

    constructor(private eref: ElementRef) {
    }

    ngOnInit() {
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'Dashboard', path: '/', active: true}];

        /**
         * fetches data
         */
        this._fetchData();
    }

    /**
     * fetches the dashboard value
     */
    private _fetchData() {

        this.widgetData = widgetData;
        this.salesMixedChart = salesMixedChart;
        this.revenueRadialChart = revenueRadialChart;
        this.userBalanceData = userBalanceData;
        this.revenueData = revenueData;
    }
}
