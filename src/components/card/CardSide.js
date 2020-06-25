import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTags,
  faTasks,
  faUserClock,
  faPaperclip,
  faTv,
  faMoneyBillWaveAlt,
  faArrowRight,
  faCopy,
  faAddressCard,
  faEye,
  faArchive,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
const CardSide = () => {
  return (
    <div className="window-sidebar">
      <div class="window-module suggested-actions-module js-suggested-actions">
        <div class="suggested-actions-settings js-suggested-actions-settings">
          <span class="icon-sm icon-gear"></span>
        </div>
        <h3 class="mod-no-top-margin">Suggested</h3>
        <div class="u-clearfix">
          <a class="button-link js-join" href="#" title="Join">
            <FontAwesomeIcon icon={faUser} />
            <span class="icon-sm icon-member"></span>
            <span class="js-sidebar-action-text">Join</span>
          </a>
        </div>
        <a
          class="suggested-actions-feedback js-suggested-actions-feedback"
          href="#"
        >
          Feedback
        </a>
      </div>
      <div class="window-module u-clearfix">
        <h3 class="mod-no-top-margin js-sidebar-add-heading">Add To Card</h3>
        <div class="u-clearfix">
          <a
            class="button-link js-change-card-members"
            href="#"
            title="Members"
          >
            <FontAwesomeIcon icon={faUser} />
            <span class="icon-sm icon-member"></span>
            <span class="js-sidebar-action-text">Members</span>
          </a>
          <a class="button-link js-edit-labels" href="#" title="Labels">
            <FontAwesomeIcon icon={faTags} />
            <span class="icon-sm icon-label"></span>
            <span class="js-sidebar-action-text">Labels</span>
          </a>
          <a
            class="button-link js-add-checklist-menu"
            href="#"
            title="Checklist"
          >
            <FontAwesomeIcon icon={faTasks} />
            <span class="icon-sm icon-checklist"></span>
            <span class="js-sidebar-action-text">Checklist</span>
          </a>
          <a class="button-link js-add-due-date" href="#" title="Due Date">
            <FontAwesomeIcon icon={faUserClock} />
            <span class="icon-sm icon-clock"></span>
            <span class="js-sidebar-action-text">Due Date</span>
          </a>
          <a class="button-link js-attach" href="#" title="Attachment">
            <FontAwesomeIcon icon={faPaperclip} />
            <span class="icon-sm icon-attachment"></span>
            <span class="js-sidebar-action-text">Attachment</span>
          </a>
          <a class="button-link js-card-cover-chooser" href="#" title="Cover">
            <FontAwesomeIcon icon={faTv} />
            <span class="icon-sm icon-card-cover"></span>
            <span class="js-sidebar-action-text">Cover</span>
          </a>
        </div>
      </div>
      <div class="js-plugin-buttons">
        <div class="window-module u-clearfix">
          <h3>Power-Ups</h3>
          <div class="u-clearfix js-button-list"></div>
          <div>
            <a
              class="button-link js-get-pups get-pups"
              href="#"
              title="Get Power-Ups"
            >
              Get Power-Ups
            </a>
            <div class="js-card-back-pup-prompt">
              <div class="js-react-root">
                <div class="card-back-pup-upgrade-prompt-section">
                  <div class="card-back-pup-upgrade-prompt-opener">
                    Get unlimited Power-Ups, plus much more.
                  </div>
                  <div class="card-back-pup-upgrade-prompt">
                    <button class="D8PrIBfVHLaC1G _1xgAps5V3J3WWx">
                      <FontAwesomeIcon icon={faMoneyBillWaveAlt} />
                      <span
                        name="business-class"
                        class="_2BQG4yPMt5s_hu _3qi72H5bh1Hw2k _1vhR091btAO7RK _39vNpql8O9h5co"
                        role="presentation"
                      ></span>
                      <div className="_17EaYJuwhiq6Dy">Upgrade Team</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="window-module u-clearfix">
        <h3 class="mod-no-top-margin">Actions</h3>
        <div class="u-clearfix">
          <a class="button-link js-move-card" href="#" title="Move">
            <FontAwesomeIcon icon={faArrowRight} />
            <span class="icon-sm icon-move"></span>
            <span class="js-sidebar-action-text">Move</span>
          </a>
          <a class="button-link js-copy-card" href="#" title="Copy">
            <FontAwesomeIcon icon={faCopy} />
            <span class="icon-sm icon-copy"></span>
            <span class="js-sidebar-action-text">Copy</span>
          </a>
          <a
            class="button-link js-convert-to-template"
            href="#"
            title="Make Template"
          >
            <FontAwesomeIcon icon={faAddressCard} />
            <span class="icon-sm icon-template-card"></span>
            <span class="js-sidebar-action-text">Make Template</span>
          </a>
          <span class="js-template-sidebar-button hide"></span>
          <span class="js-subscribe-sidebar-button hide"></span>
          <a
            class="button-link toggle-button js-subscribe"
            title="Watch the card to get notifications when something changes."
            href="#"
          >
            <FontAwesomeIcon icon={faEye} />
            <span class="icon-sm icon-subscribe"></span>
            <span>Watch</span>
            <span class="on">
              <span class="icon-sm icon-check light"></span>
            </span>
          </a>
          <span class="js-vote-sidebar-button hide"></span>
          <hr />
          <a class="button-link js-archive-card" href="#" title="Archive">
            <FontAwesomeIcon icon={faArchive} />
            <span class="icon-sm icon-archive"></span>
            <span class="js-sidebar-action-text" title="Archive">
              Archive
            </span>
          </a>
          <a
            class="button-link js-unarchive-card hide"
            href="#"
            title="Send to board"
          >
            <span class="icon-sm icon-refresh"></span>
            <span class="js-sidebar-action-text" title="Send to board">
              Send to board
            </span>
          </a>
          <a
            class="button-link js-delete-card hide negate"
            href="#"
            title="Delete"
          >
            <span class="icon-sm icon-remove"></span>
            <span class="js-sidebar-action-text">Delete</span>
          </a>
          {/* ::after */}
        </div>
        <a class="button-link js-more-menu" href="#" title="Share">
          <FontAwesomeIcon icon={faShareAlt} />
          <span class="icon-sm icon-share"></span>
          <span class="js-sidebar-action-text">Share</span>
        </a>
      </div>
    </div>
  );
};
export default CardSide;
