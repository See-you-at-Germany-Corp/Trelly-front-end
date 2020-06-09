import React from "react";
const barProfile = () => {
  return (
    <div>
      <div className="tabbed-pane-header">
        <div className="tabbed-pane-header-wrapper u-clearfix js-header-wrapper">
          <div className="js-react-root">
            <div className="BFvHU0I3_SHVGs">
              <div className="_2VjAiapxpR45EU">
                <div
                  className="_1FekJJAz6Hu32v"
                  title="Mark Latthapol (marklatthapol)"
                >
                  <span
                    className="namePicture"
                    style={{
                      fontSize: "22px",
                      height: "48px",
                      width: "48px",
                      lineHeight: "48px",
                    }}
                  >
                    ML
                  </span>
                </div>
              </div>
              <div className="_2MiqoEbHZgSlXq">
                <span className="_32mB-ZO8fxjtUy">Mark Latthapol</span>
                <span className="YGN7y_VVuqFYYB">@marklatthapol</span>
              </div>
            </div>
          </div>
        </div>
        <div className="tabbed-pane-nav u-clearfix js-nav">
          <ul>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-member-profile active"
                data-tab="profile"
                href=""
              >
                Profile and Visibility
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-member-activity"
                data-tab="cards"
                href=""
              >
                Activity
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-member-cards"
                data-tab="cards"
                href=""
              >
                Cards
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-member-account"
                data-tab="settings"
                href=""
              >
                Settings
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-billing"
                data-tab="trello-gold"
                href=""
              >
                <span className="icon-sm icon-trello-gold mod-inline icon-trello-gold-color"></span>{" "}
                Trello Gold
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default barProfile;
