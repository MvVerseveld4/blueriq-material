import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Container, Page } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

type ContainerDisplayMode = '' | 'introduction' | 'transparent' | 'card';

@Component({
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
  animations: [
    trigger('animate', [
      transition(':leave', [
        query('@*', animateChild(), { optional: true })
      ])
    ])
  ]
})
@BlueriqComponent({
  type: Container
})
export class ContainerComponent implements OnInit, OnUpdate {

  public displayMode: ContainerDisplayMode;
  public horizontal = false;
  public alignRight = false;
  public bigHeader = true;

  constructor(@Host() public container: Container,
              @Optional() @Host() public readonly table: Table,
              private blueriqSession: BlueriqSession
  ) {
  }

  ngOnInit() {
    this.determineDisplayStyle();
  }

  bqOnUpdate() {
    this.determineDisplayStyle();
  }

  /**
   * Finds presentation styles to determine the look-and-feel of the container
   */
  private determineDisplayStyle() {
    this.horizontal = this.container.styles.has(BqPresentationStyles.HORIZONTAL);
    this.alignRight = this.container.styles.hasAny(BqPresentationStyles.ALIGNRIGHT)
      || this.container.styles.has(BqPresentationStyles.DEPRECATED_ALIGNRIGHT);
    this.bigHeader = !this.blueriqSession.isWidget;

    if (this.container.parent && !(this.container.parent instanceof Page) || this.blueriqSession.isWidget) {
      // container within a container doesn't need specific styling
      this.displayMode = '';
    } else if (this.isIntroduction()) {
      this.displayMode = 'introduction';
    } else if (this.container.styles.has(BqPresentationStyles.TRANSPARENT)) {
      this.displayMode = 'transparent';
    } else {
      this.displayMode = 'card';
    }
  }

  isIntroduction(): boolean {
    return this.container.styles.has(BqPresentationStyles.INTRODUCTION);
  }

}
