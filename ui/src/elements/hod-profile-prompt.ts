import { LitElement, css, html, query, property } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';

import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { GET_MY_PROFILE } from '../graphql/queries';
import { Agent } from '../types';
import { sharedStyles } from '../sharedStyles';

export abstract class HodProfilePrompt extends LitElement {
  /** Public attributes */

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  @property({ type: Object })
  _myProfile: Agent | undefined = undefined;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  async firstUpdated() {
    const result = await this._apolloClient.query({
      query: GET_MY_PROFILE,
    });

    this._myProfile = result.data.me;
  }

  agentHasCreatedProfile() {
    return this._myProfile && this._myProfile.profile;
  }

  onProfileCreated(e: CustomEvent) {
    this._myProfile = {
      id: this._myProfile?.id as string,
      profile: e.detail.profile,
    };
  }

  renderPrompt() {
    return html` <div
      class="column"
      style="align-items: center; justify-content: center"
    >
      ${this._myProfile
        ? html`<hod-create-profile-form
            @profile-created=${this.onProfileCreated}
          ></hod-create-profile-form>`
        : html`<mwc-circular-progress></mwc-circular-progress>`}
    </div>`;
  }

  render() {
    return html`
      ${this.agentHasCreatedProfile() ? html`<slot></slot>` : this.renderPrompt()}
    `;
  }
}