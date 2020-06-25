import React from "react";
const CardMain = () => {
  return (
    <div class="window-main-col">
      <div class="card-detail-data u-gutter">
        <div class="card-detail-item u-clearfix hide js-card-detail-members">
          <h3 class="card-detail-item-header mod-no-top-margin">Members</h3>
          <div class="js-card-detail-members-list">
            <a class="card-detail-item-add-button js-details-edit-members mod-round">
              <span class="icon-sm icon-add"></span>
            </a>
          </div>
        </div>
        <div class="card-detail-item card-detail-item-labels u-clearfix js-card-detail-labels">
          <h3 class="card-detail-item-header">Labels</h3>
          <div class="u-clearfix js-card-detail-labels-list js-edit-label">
            <span
              class="card-label card-label-black mod-card-detail mod-clickable"
              title=""
            >
              <span class="label-text">&nbsp;</span>
            </span>
            <a class="card-detail-item-add-button js-details-edit-labels">
              <span class="icon-sm icon-add"></span>
            </a>
          </div>
        </div>
        <div class="card-detail-item hide js-card-detail-due-date">
          <h3 class="card-detail-item-header">Due Date</h3>
          <div class="card-detail-due-date-badge js-card-detail-due-date-badge">
            <a
              class="card-detail-badge-due-date-complete-box js-card-detail-due-date-badge-complete"
              href="#"
              role="button"
            >
              <span class="icon-sm icon-check card-detail-badge-due-date-complete-icon"></span>
            </a>
            <button class="button-link card-detail-badge-due-date-button">
              <span class="js-date-text card-detail-due-date-text"></span>
              <span class="js-due-status card-detail-due-status-lozenge"></span>
            </button>
          </div>
        </div>
        <div class="card-detail-item hide js-card-detail-votes">
          <h3 class="card-detail-item-header">Votes</h3>
          <a
            class="card-detail-badge is-clickable js-card-detail-votes-badge js-show-votes"
            href="#"
          ></a>
        </div>
        <div class="card-detail-item hide js-card-detail-age">
          <h3 class="card-detail-item-header">Last Updated</h3>
          <div class="card-detail-badge date mod-last-updated js-card-detail-age-badge past"></div>
        </div>
        <div class="plugin-detail-badges js-plugin-badges">
          <div></div>
        </div>
        <div class="u-clearfix"></div>
      </div>

      <div class="js-fill-card-detail-desc">
        <div>
          <div class="window-module">
            <div class="window-module-title window-module-title-no-divider description-title">
              <span class="icon-description icon-lg window-module-title-icon"></span>
              <h3 class="u-inline-block">Description</h3>
              <div class="editable" attr="desc">
                <a
                  class="button subtle hide-on-edit js-show-with-desc js-edit-desc js-edit-desc-button hide"
                  href="#"
                >
                  Edit
                </a>
                <span class="editing-members-description js-editing-members-description hide"></span>
              </div>
            </div>
            <div class="u-gutter">
              <div class="editable" attr="desc">
                <div class="description-content js-desc-content">
                  <div class="description-content-fade-button">
                    <span class="description-content-fade-button-text">
                      Show full description.
                    </span>
                  </div>
                  <div
                    class="current markeddown hide-on-edit js-desc js-show-with-desc hide"
                    dir="auto"
                  ></div>
                  <p class="u-bottom js-hide-with-desc">
                    <a
                      class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                      href="#"
                    >
                      Add a more detailed description…
                    </a>
                  </p>
                  <div class="description-edit edit">
                    <a class="helper button subtle js-format-help" href="#">
                      Formatting help
                    </a>
                    <textarea
                      class="field field-autosave js-description-draft description card-description"
                      placeholder="Add a more detailed description…"
                    ></textarea>
                  </div>
                  <p class="edits-warning quiet">
                    You have unsaved edits on this field.{" "}
                    <a class="js-view-edits" href="#">
                      View edits
                    </a>{" "}
                    -{" "}
                    <a class="js-discard-edits" href="#">
                      Discard
                    </a>
                  </p>
                  <p class="edits-error error">Edit not saved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="window-module">
        <div class="window-module-title window-module-title-no-divider card-detail-activity">
          <span class="window-module-title-icon icon-lg icon-activity"></span>
          <h3>Activity</h3>
          <div class="window-module-title-options">
            <span class="editing-members-comments js-editing-members-comments hide"></span>
            <a class="subtle button hide js-show-details" href="#">
              Show Details
            </a>
            <a class="subtle button js-hide-details" href="#">
              Hide Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardMain;
