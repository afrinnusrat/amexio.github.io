/**
 * Created by ketangote on 12/1/17.
 */

/*
Component Name : Amexio Accordion
Component Selector : <amexio-accordion>
Component Description : Amexio Accordion provides an easy way to organize big
forms by grouping the fields in accordion tabs.

*/

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AmexioTabPillComponent } from '../tab.pill.component';

@Component({
  selector: 'amexio-vertical-tab-view',
  templateUrl: './vertical.tab.component.html',
})

export class AmexioVerticalTabComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

  @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;
  @ViewChild('target', { read: ViewContainerRef }) target: any;

  /*
   Properties
   name : closable
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : This flag will make tab closable.
   */
  @Input() closable: boolean;
  /*
   Properties
   name :tab-position
   datatype : string
   version : 4.1.9 onwards
   default : top
   description : Position of tab can be (top/bottom)
   */
  @Input() tabPosition: string;
  /*
Events
name : onClick
datatype : none
version : 4.0 onwards
default :none
description : Callback to invoke on activated tab event.
*/
  @Output() onClick: any = new EventEmitter<any>();

  tabCollection: AmexioTabPillComponent[];

  content: string;

  componentId = '';

  constructor(public render: Renderer2) {
    this.tabPosition = 'top';
  }
  ngOnInit() {
    this.componentId = Math.floor(Math.random() * 90000) + 10000 + '_tabc';
  }
  ngAfterViewInit() {
  }
  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }
  onTabClick(tab: any) {
    if (!tab.disabled) {
      for (const i of this.tabCollection) {
        if (i === tab) {
          i['active'] = true;
          this.onClick.emit(tab);
        } else {
          i['active'] = false;
        }
      }
    }
  }
  // Code to be done
  findTabStyleClass() {
    if (this.tabPosition === 'top') {
      return 'tabposition-top';
    }
    if (this.tabPosition === 'bottom') {
      return 'tabposition-bottom';
    }
  }
  closeAllTabs() {
    this.tabCollection.forEach((tabs) => {
      if (tabs.closable === true || this.closable === true) {
        this.closeTab(tabs);
      }
    });
  }
  closeTab(tabNode: AmexioTabPillComponent) {
    const newTab: AmexioTabPillComponent[] = [];
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach((tab: any, i: number) => {
      tab.active = false;
      if (tab.tabId === tabNode.tabId) {
        tabHighlightIndex = index;
        if (tab.hasOwnProperty('tabpillinstance')) {
          tab.target.remove();
        } else {
          const removeNode = document.getElementById(tab.tabId).parentNode;
          const parentRefNode = removeNode.parentNode;
          parentRefNode.removeChild(removeNode);
        }
      } else if (tab.tabId !== tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex === newTab.length) {
      tabHighlightIndex--;
    }
    this.tabCollection = newTab;
    if (tabHighlightIndex > -1) {
      this.activateTab(newTab[tabHighlightIndex].tabId);
    } else {
      this.activateTab(null);
    }
    if (this.tabCollection.length === 1) {
      this.closable = false;
    }
    if (newTab.length === 1) {
      newTab[0].closable = false;
    }
  }
  closeTabs(data: any) {
    const tabList: any[] = [];
    this.tabCollection.forEach((tabs) => {
      tabs.active = false;
      data.forEach((opt: any) => {
        if (opt.toLowerCase() !== tabs.title.toLowerCase() && (tabs.closable === true || this.closable === true)) {
          this.closeTab(tabs);
        } else {
          tabList.push(tabs);
          this.asignTabPillClass(tabs);
        }
      });

    });
    tabList[tabList.length - 1].active = true;
    this.asignTabPillClass(tabList[tabList.length - 1]);

  }
  asignTabPillClass(tabData: any) {
    tabData.tabPillClass = '';
    if ((!tabData.amexiocolor || tabData.amexiocolor === '') && tabData.active && (this.tabPosition === 'top')) {
      tabData.tabPillClass = 'activetab';
    }
    if ((!tabData.amexiocolor || tabData.amexiocolor === '') && (this.tabPosition === 'bottom') && tabData.active) {
      tabData.tabPillClass = 'bottomActivetab';
    }
    if (tabData.disabled) {
      tabData.tabPillClass = 'disabled-tab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active) {
      tabData.tabPillClass = 'activecolortab';
    }
    if ((tabData.amexiocolor !== '') && (this.tabPosition === 'bottom') && tabData.active) {
      tabData.tabPillClass = 'activebottomcolortab';
    }
  }
  activateTab(tabId: number) {
    this.tabCollection.forEach((tab) => {
      tab.active = false;
    });
  }
}
