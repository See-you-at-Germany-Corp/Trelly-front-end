import React from "react";
const BarProfile = (props) => {

  const [
    state = {
      fullName: props.data.fullname,
      initials: props.data.init,
      userName: props.data.username,
      //picture: props.data.fullName,
      status: "",
    },
    setState,
  ] = React.useState();

  const activeStatus = () => {
    setState({ status: " active" });
  };
  return (
    <div>
      <div className="tabbed-pane-header">
        <div className="tabbed-pane-header-wrapper u-clearfix js-header-wrapper">
          <div className="js-react-root">
            <div className="contain-picture-header">
              <div className="contain-content-header">
                <div
                  className="contain-title-header"
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
                    {state.initials}
                  </span>
                </div>
              </div>
              <div className="content-header">
                <span className="content-name">{state.fullName}</span>
                <span className="content-nickname">@{state.userName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="tabbed-pane-nav u-clearfix js-nav">
          <ul>
            <li className="tabbed-pane-nav-item">
              <a
                className={`tabbed-pane-nav-item-button js-member-profile ${state.status}`}
                data-tab="profile"
                href="/"
                onClick={() => activeStatus()}
              >
                Profile and Visibility
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className={`tabbed-pane-nav-item-button js-member-activity ${state.status}`}
                data-tab="cards"
                href="/"
                onClick={() => activeStatus()}
              >
                Activity
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-member-cards"
                data-tab="cards"
                href="/"
              >
                Cards
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-member-account"
                data-tab="settings"
                href="/"
              >
                Settings
              </a>
            </li>
            <li className="tabbed-pane-nav-item">
              <a
                className="tabbed-pane-nav-item-button js-billing"
                data-tab="trello-gold"
                href="/"
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

export default BarProfile;
