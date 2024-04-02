import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForBusiness.module.css";
const PastJobListing = () => {
  const navigate = useNavigate();

  const onBUTTONSecondaryClick = useCallback(() => {
    navigate("/pastJobListing");
  }, [navigate]);

  return (
    <div className={styles.forBusiness}>
      <div className={styles.frameParent}>
        <div className={styles.buttonSecondaryParent}>
          <div
            className={styles.buttonSecondary}
            onClick={onBUTTONSecondaryClick}
          >
            <div className={styles.secondaryButton}>Master Contract</div>
          </div>
          <div className={styles.buttonPrimary}>
            <div className={styles.secondaryButton}>Past Posted jobs</div>
          </div>
        </div>
        <div className={styles.component19Parent}>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
          <div className={styles.component19}>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall}
                alt=""
                src="/atomic-vertical-dividor-small.svg"
              />
              <div className={styles.title}>
                <div className={styles.checkboxParent}>
                  <img
                    className={styles.checkboxIcon}
                    alt=""
                    src="/checkbox.svg"
                  />
                  <div className={styles.titleParent}>
                    <div className={styles.secondaryButton}>Past job name</div>
                    <div className={styles.jobShortDescriptionParent}>
                      <div className={styles.jobShortDescription}>
                        Job short description
                      </div>
                      <img
                        className={styles.icInfoOutline24pxIcon}
                        alt=""
                        src="/ic-info-outline-24px.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.atomic}>
                  <img
                    className={styles.icTruckShipping24pxIcon}
                    alt=""
                    src="/ic-truck-shipping-24px.svg"
                  />
                  <b className={styles.jobShortDescription}>Loaded</b>
                </div>
              </div>
            </div>
            <div className={styles.updatedTitle}>
              <img
                className={styles.atomicVerticalDividorSmall1}
                alt=""
                src="/atomic-vertical-dividor-small1.svg"
              />
              <div className={styles.frameGroup}>
                <div className={styles.titleParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Last Updated</span>
                    <span>: 5 Days ago</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Job type</span>
                    <span>: Video editor</span>
                  </div>
                </div>
                <div className={styles.statusActiveParent}>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Status</span>
                    <span>: Active</span>
                  </div>
                  <div className={styles.jobShortDescription}>
                    <span className={styles.lastUpdated}>Tags</span>
                    <span>: Video</span>
                  </div>
                </div>
                <div className={styles.itemNormalParent}>
                  <div className={styles.jobShortDescription}>
                    <span>
                      <span className={styles.amount}>Amount</span>
                      <span>: $ 250</span>
                    </span>
                    <b className={styles.b}>{` `}</b>
                  </div>
                  <img
                    className={styles.icInfoOutline24pxIcon}
                    alt=""
                    src="/ic-info-outline-24px1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.button}>
                <div className={styles.clone}>Clone</div>
              </div>
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/materialsymbolseditoutline.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/delete24px-1.svg"
              />
              <img
                className={styles.materialSymbolseditOutlineIcon}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.frameParent7}>
          <div className={styles.groupWrapper}>
            <img
              className={styles.frameChild}
              alt=""
              src="/group-480990651@2x.png"
            />
          </div>
          <div className={styles.influkartParent}>
            <div className={styles.influkart}>Inflozy</div>
            <div className={styles.influencersSocialNetwork}>
              Influencer’s Social Network
            </div>
          </div>
        </div>
        <div className={styles.profile1}>
          <div className={styles.profileDetails}>
            <div className={styles.helloJano}>Hello Jano</div>
            <div className={styles.seniorManager}>Senior Manager</div>
          </div>
          <img
            className={styles.profile1Child}
            alt=""
            src="/ellipse-688@2x.png"
          />
        </div>
        <div className={styles.search}>
          <img
            className={styles.iconContainer}
            alt=""
            src="/iconcontainer.svg"
          />
          <div className={styles.search1}>Search</div>
        </div>
        <div className={styles.instanceParent}>
          <div className={styles.homeParent}>
            <img
              className={styles.materialSymbolseditOutlineIcon}
              alt=""
              src="/home.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home}>Home</div>
              <div className={styles.seniorManager}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.queryParent}>
            <img
              className={styles.materialSymbolseditOutlineIcon}
              alt=""
              src="/query1.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home1}>Query</div>
              <div className={styles.seniorManager2}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.queryParent}>
            <img
              className={styles.materialSymbolseditOutlineIcon}
              alt=""
              src="/message1.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home1}>Message</div>
              <div className={styles.seniorManager2}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.queryParent}>
            <img
              className={styles.materialSymbolseditOutlineIcon}
              alt=""
              src="/job.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home1}>My Jobs</div>
              <div className={styles.seniorManager2}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.queryParent}>
            <img
              className={styles.materialSymbolseditOutlineIcon}
              alt=""
              src="/matrix.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home1}>Matrix</div>
              <div className={styles.seniorManager2}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.queryParent}>
            <img
              className={styles.materialSymbolseditOutlineIcon}
              alt=""
              src="/notification1.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home1}>Notification</div>
              <div className={styles.seniorManager2}>Senior Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastJobListing;