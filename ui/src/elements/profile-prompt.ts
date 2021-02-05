import { css, html, property, PropertyValues } from 'lit-element';

import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { sharedStyles } from './utils/shared-styles';
import { BaseElement, connectProfiles } from './utils/base-element';
import { CreateProfileForm } from './create-profile-form';

/**
 * @element profile-prompt
 */
export abstract class ProfilePrompt extends BaseElement {
  /** Public attributes */

  /** Private properties */

  @property({ type: Boolean })
  _loading = true;

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }

  async firstUpdated() {
    await this.profilesStore.fetchMyProfile();
    this._loading = false;
  }

  renderPrompt() {
    return html` <div
      class="column"
      style="align-items: center; justify-content: center; flex: 1;"
    >
      ${this._loading
        ? html`<mwc-circular-progress indeterminate></mwc-circular-progress>`
        : html`<create-profile-form></create-profile-form>`}
    </div>`;
  }

  render() {
    return html`
      ${!this._loading && this.profilesStore.myProfile
        ? html`<slot></slot>`
        : this.renderPrompt()}
    `;
  }

  getScopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-circular-progress': CircularProgress,
      'create-profile-form': connectProfiles(CreateProfileForm, this.profilesStore),
    };
  }
}
