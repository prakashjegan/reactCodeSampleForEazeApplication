import React from 'react';
import { useCallback } from "react";
import { useNavigate , useParams} from "react-router-dom";
import styles from "./style.scss";
const UserList = () => {
  const { type } = useParams();
  console.log(type)
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/create-a-job");
  }, [navigate]);

  return (
    <div className={styles.userListSendRequestScree}>
      <div className={styles.moleculeFiltersLineParent}>
        <div className={styles.moleculeFiltersLine}>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Followers</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Users</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Reviews</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Avg View</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Language</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Location</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Platforms</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
          <div className={styles.atomicfilter}>
            <div className={styles.fournisseur}>Jobs</div>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/ic-keyboard-arrow-up-24px.svg"
            />
          </div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.filterHorizontalPaneParent}>
            <div className={styles.filterHorizontalPane}>
              <div className={styles.icon24filterParent}>
                <img
                  className={styles.icon24filter}
                  alt=""
                  src="/icon24filter.svg"
                />
                <div className={styles.chips}>
                  <div className={styles.text}>10K-100K</div>
                  <img
                    className={styles.icon24filter}
                    alt=""
                    src="/icon24cross.svg"
                  />
                </div>
                <div className={styles.chips1}>
                  <div className={styles.text}>{`>50K Views`}</div>
                  <img
                    className={styles.icon24filter}
                    alt=""
                    src="/icon24cross.svg"
                  />
                </div>
                <div className={styles.btnsSet}>
                  <img
                    className={styles.icKeyboardArrowUp24pxIcon}
                    alt=""
                    src="/icon24plus.svg"
                  />
                  <div className={styles.home}>Filter</div>
                </div>
              </div>
            </div>
            <div className={styles.button} onClick={onButtonContainerClick}>
              <div className={styles.button1}>Send Request</div>
            </div>
          </div>
          <div className={styles.tableCountTopbar}>
            <div className={styles.text3}>
              <span>{`Selected `}</span>
              <span className={styles.span}>198</span>
              <span>{` from Showing `}</span>
              <span className={styles.span}>893</span>
              <span> results</span>
            </div>
          </div>
          <div className={styles.bgWhiteParent}>
            <div className={styles.bgWhite} />
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.userProfileParent}>
              <div className={styles.userProfile}>User Profile</div>
              <b className={styles.reviews}>Reviews</b>
              <div className={styles.avgView}>Avg View</div>
              <div className={styles.location}>Location</div>
              <div className={styles.language}>Language</div>
              <div className={styles.followers}>Followers</div>
              <div className={styles.category}>Category</div>
              <b className={styles.actions}>Actions</b>
              <b className={styles.platforms}>Platforms</b>
            </div>
            <div className={styles.btnsSetSimpleSortMethod}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod1}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod2}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod3}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod4}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod5}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod6}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
            <div className={styles.btnsSetSimpleSortMethod7}>
              <img
                className={styles.icon24filter}
                alt=""
                src="/icon24sortstyle1.svg"
              />
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.mParent}>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
            </div>
            <div className={styles.socialIconsParent}>
              <img
                className={styles.socialIcons}
                alt=""
                src="/social-icons.svg"
              />
              <div className={styles.platformWithLinkParent}>
                <div className={styles.fournisseur}>Platform with link</div>
                <div className={styles.jobs}>20 Jobs</div>
              </div>
            </div>
            <div className={styles.frameDiv}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
              <img
                className={styles.icKeyboardArrowUp24pxIcon8}
                alt=""
                src="/ic-keyboard-arrow-up-24px.svg"
              />
            </div>
            <div className={styles.frameParent3}>
              <div className={styles.frameWrapper}>
                <div className={styles.socialIconsGroup}>
                  <img
                    className={styles.socialIcons}
                    alt=""
                    src="/social-icons.svg"
                  />
                  <div className={styles.platformWithLinkParent}>
                    <div className={styles.fournisseur}>Platform with link</div>
                    <div className={styles.jobs}>20 Jobs</div>
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img className={styles.paperAirplaneIcon} alt="" />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-6133@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table1}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon} alt="" src="/checkbox.svg" />
            <div className={styles.frameParent6}>
              <div className={styles.rectangleParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/rectangle-61331@2x.png"
                />
                <div className={styles.platformWithLinkParent}>
                  <div className={styles.cameronWilliamson}>
                    Cameron Williamson
                  </div>
                  <div className={styles.freelancer20jobs}>
                    Freelancer-20Jobs
                  </div>
                </div>
              </div>
              <div className={styles.m}>2.5m</div>
              <div className={styles.delhi}>Delhi</div>
              <div className={styles.english}>English</div>
              <div className={styles.m1}>5.6m</div>
              <div className={styles.of48ReviewsParent}>
                <div className={styles.of48Reviews}>5.00 of 48 reviews</div>
                <div className={styles.image7Parent}>
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                  <img
                    className={styles.image7Icon}
                    alt=""
                    src="/image-7@2x.png"
                  />
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 1</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 2</div>
                </div>
                <div className={styles.tag1Wrapper}>
                  <div className={styles.cameronWilliamson}>Tag 3</div>
                </div>
              </div>
              <img
                className={styles.paperAirplaneIcon}
                alt=""
                src="/paperairplane1.svg"
              />
              <img
                className={styles.icoutlineMessageIcon}
                alt=""
                src="/icoutlinemessage.svg"
              />
            </div>
          </div>
          <div className={styles.table39}>
            <div className={styles.bgWhite1} />
            <div className={styles.lineSeparatorDividor}>
              <div className={styles.lineSeparatorDividorChild} />
            </div>
            <img className={styles.checkboxIcon40} alt="" src="/checkbox.svg" />
            <div className={styles.pagination}>
              <img className={styles.pageIcon} alt="" src="/page.svg" />
              <div className={styles.page}>
                <div className={styles.pageActive}>
                  <img className={styles.caratIcon} alt="" src="/carat.svg" />
                  <b className={styles.num}>1</b>
                </div>
              </div>
              <div className={styles.page1}>
                <b className={styles.num}>2</b>
              </div>
              <div className={styles.page1}>
                <b className={styles.num}>...</b>
              </div>
              <div className={styles.page1}>
                <b className={styles.num}>9</b>
              </div>
              <div className={styles.page1}>
                <b className={styles.num}>10</b>
              </div>
              <img className={styles.pageIcon1} alt="" src="/page1.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.frameParent120}>
          <div className={styles.groupWrapper}>
            <img
              className={styles.groupIcon}
              alt=""
              src="/group-480990652@2x.png"
            />
          </div>
          <div className={styles.influkartParent}>
            <div className={styles.influkart}>Influkart</div>
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
            src="/ellipse-6881@2x.png"
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
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/home.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home}>Home</div>
              <div className={styles.seniorManager1}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.queryParent}>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/query.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home1}>Query</div>
              <div className={styles.seniorManager}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.homeParent}>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/message.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home}>Message</div>
              <div className={styles.seniorManager1}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.homeParent}>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/job.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home}>My Jobs</div>
              <div className={styles.seniorManager1}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.homeParent}>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/matrix1.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home4}>Metrics</div>
              <div className={styles.seniorManager1}>Senior Manager</div>
            </div>
          </div>
          <div className={styles.homeParent}>
            <img
              className={styles.icKeyboardArrowUp24pxIcon}
              alt=""
              src="/notification2.svg"
            />
            <div className={styles.profileDetails}>
              <div className={styles.home}>Notification</div>
              <div className={styles.seniorManager1}>Senior Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
