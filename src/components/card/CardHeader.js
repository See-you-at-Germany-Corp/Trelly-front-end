import React from "react";
const CardHeader = () => {
  return (
    <div class="window-header">
      <span class="window-header-icon icon-lg icon-card js-card-header-icon"></span>
      <div class="window-title">
        <h2 class="card-detail-title-assist js-title-helper" dir="auto">
          วางโครง ci/cd
        </h2>
        <textarea
          class="mod-card-back-title js-card-detail-title-input"
          dir="auto"
          style={{
            overflow: "hidden",
            overflowWrap: "break-word",
            height: "32.8px",
          }}
        ></textarea>
      </div>
      <div class="window-header-inline-content quiet js-current-list">
        <p class="u-inline-block u-bottom">
          in list{" "}
          <a href="#" class="js-open-move-from-header">
            Backlogs
          </a>
        </p>
      </div>
      <div class="window-header-inline-content hide js-subscribed-indicator-header">
        <span class="icon-sm icon-subscribe"></span>
      </div>
    </div>
  );
};
export default CardHeader;
