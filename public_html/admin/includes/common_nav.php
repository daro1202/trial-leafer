<nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">

  <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
  <a class="navbar-brand me-1 me-sm-3" href="../index.html">
    <div class="d-flex align-items-center"><img class="me-2" src="../assets/img/icons/spot-illustrations/falcon.png" alt="" width="40" /><span class="font-sans-serif">falcon</span>
    </div>
  </a>
  <ul class="navbar-nav align-items-center d-none d-lg-block">
    <li class="nav-item">
      <div class="search-box" data-list='{"valueNames":["title"]}'>
        <form class="position-relative" data-bs-toggle="search" data-bs-display="static" onsubmit="return submitSearch()">
          <input id="search-text" class="form-control search-input fuzzy-search" type="search" placeholder="ASIN、UPC、EAN、ISBN-13" aria-label="Search" />
          <span class="fas fa-search search-box-icon"></span>
        </form>
        <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none" data-bs-dismiss="search">
          <div class="btn-close-falcon" aria-label="Close"></div>
        </div>
        <div id="search-result__list" class="dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100"></div>
      </div>
    </li>
  </ul>
  <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
    <li class="nav-item">
      <div class="theme-control-toggle fa-icon-wait px-2">
        <input class="form-check-input ms-0 theme-control-toggle-input" id="themeControlToggle" type="checkbox" data-theme-control="theme" value="dark" />
        <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to light theme"><span class="fas fa-sun fs-0"></span></label>
        <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to dark theme"><span class="fas fa-moon fs-0"></span></label>
      </div>
    </li>
    <li class="nav-item d-none d-sm-block">
      <a class="nav-link px-0 notification-indicator notification-indicator-warning notification-indicator-fill fa-icon-wait" href="../app/e-commerce/shopping-cart.html"><span class="fas fa-shopping-cart" data-fa-transform="shrink-7" style="font-size: 33px;"></span><span class="notification-indicator-number">1</span></a>

    </li>
    <li class="nav-item dropdown">
      <a class="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait" id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll"><span class="fas fa-bell" data-fa-transform="shrink-6" style="font-size: 33px;"></span></a>
      <div class="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-menu-notification" aria-labelledby="navbarDropdownNotification">
        <div class="card card-notification shadow-none">
          <div class="card-header">
            <div class="row justify-content-between align-items-center">
              <div class="col-auto">
                <h6 class="card-header-title mb-0">Notifications</h6>
              </div>
              <div class="col-auto ps-0 ps-sm-3"><a class="card-link fw-normal" href="#">Mark all as read</a></div>
            </div>
          </div>
          <div class="scrollbar-overlay" style="max-height:19rem">
            <div class="list-group list-group-flush fw-normal fs--1">
              <div class="list-group-title border-bottom">NEW</div>
              <div class="list-group-item">
                <a class="notification notification-flush notification-unread" href="#!">
                  <div class="notification-avatar">
                    <div class="avatar avatar-2xl me-3">
                      <img class="rounded-circle" src="../assets/img/team/1-thumb.png" alt="" />

                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>Emma Watson</strong> replied to your comment : "Hello world 😍"</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">💬</span>Just now</span>

                  </div>
                </a>

              </div>
              <div class="list-group-item">
                <a class="notification notification-flush notification-unread" href="#!">
                  <div class="notification-avatar">
                    <div class="avatar avatar-2xl me-3">
                      <div class="avatar-name rounded-circle"><span>AB</span></div>
                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>Albert Brooks</strong> reacted to <strong>Mia Khalifa's</strong> status</p>
                    <span class="notification-time"><span class="me-2 fab fa-gratipay text-danger"></span>9hr</span>

                  </div>
                </a>

              </div>
              <div class="list-group-title border-bottom">EARLIER</div>
              <div class="list-group-item">
                <a class="notification notification-flush" href="#!">
                  <div class="notification-avatar">
                    <div class="avatar avatar-2xl me-3">
                      <img class="rounded-circle" src="../assets/img/icons/weather-sm.jpg" alt="" />

                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1">The forecast today shows a low of 20&#8451; in California. See today's weather.</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🌤️</span>1d</span>

                  </div>
                </a>

              </div>
              <div class="list-group-item">
                <a class="border-bottom-0 notification-unread  notification notification-flush" href="#!">
                  <div class="notification-avatar">
                    <div class="avatar avatar-xl me-3">
                      <img class="rounded-circle" src="../assets/img/logos/oxford.png" alt="" />

                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>University of Oxford</strong> created an event : "Causal Inference Hilary 2019"</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">✌️</span>1w</span>

                  </div>
                </a>

              </div>
              <div class="list-group-item">
                <a class="border-bottom-0 notification notification-flush" href="#!">
                  <div class="notification-avatar">
                    <div class="avatar avatar-xl me-3">
                      <img class="rounded-circle" src="../assets/img/team/10.jpg" alt="" />

                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>James Cameron</strong> invited to join the group: United Nations International Children's Fund</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🙋‍</span>2d</span>

                  </div>
                </a>

              </div>
            </div>
          </div>
          <div class="card-footer text-center border-top"><a class="card-link d-block" href="../app/social/notifications.html">View all</a></div>
        </div>
      </div>

    </li>
    <li class="nav-item dropdown">
      <a class="nav-link fa-icon-wait" id="navbarDropdownMenu" role="button" data-hide-on-body-scroll="data-hide-on-body-scroll" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="nine-dots"></span></a>
      <div class="dropdown-menu dropdown-menu-end dropdown-menu-card" aria-labelledby="navbarDropdownMenu">
        <div class="card shadow-none">
          <div class="scrollbar-overlay navbar-dropdown-dots">
            <div class="card-body px-3">
              <div class="row text-center gx-0 gy-0">
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="../pages/user/profile.html" target="_blank">
                    <div class="avatar avatar-2xl"> <img class="rounded-circle" src="../assets/img/team/3.jpg" alt="" /></div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Account</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://themewagon.com/" target="_blank"><img class="rounded" src="../assets/img/nav-icons/themewagon.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Themewagon</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://mailbluster.com/" target="_blank"><img class="rounded" src="../assets/img/nav-icons/mailbluster.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Mailbluster</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/google.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Google</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/spotify.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Spotify</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/steam.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Steam</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/github-light.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Github</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/discord.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Discord</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/xbox.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">xbox</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/trello.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Kanban</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/hp.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Hp</p>
                  </a></div>
                <div class="col-12">
                  <hr class="my-3 mx-n3 bg-200" />
                </div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/linkedin.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Linkedin</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/twitter.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Twitter</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/facebook.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Facebook</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/instagram.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Instagram</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/pinterest.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Pinterest</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/slack.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Slack</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="../assets/img/nav-icons/deviantart.png" alt="" width="40" height="40" />
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Deviantart</p>
                  </a></div>
                <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="../app/events/event-detail.html" target="_blank">
                    <div class="avatar avatar-2xl">
                      <div class="avatar-name rounded-circle bg-soft-primary text-primary"><span class="fs-2">E</span></div>
                    </div>
                    <p class="mb-0 fw-medium text-800 text-truncate fs--2">Events</p>
                  </a></div>
                <div class="col-12"><a class="btn btn-outline-primary btn-sm mt-4" href="#!">Show more</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </li>
    <li class="nav-item dropdown"><a class="nav-link pe-0" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div class="avatar avatar-xl">
          <img class="rounded-circle" src="../assets/img/team/3-thumb.png" alt="" />

        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
        <div class="bg-white dark__bg-1000 rounded-2 py-2">
          <a class="dropdown-item fw-bold text-warning" href="#!"><span class="fas fa-crown me-1"></span><span>Go Pro</span></a>

          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#!">Set status</a>
          <a class="dropdown-item" href="../pages/user/profile.html">Profile &amp; account</a>
          <a class="dropdown-item" href="#!">Feedback</a>

          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="../pages/user/settings.html">Settings</a>
          <a class="dropdown-item" href="../pages/authentication/card/logout.html">Logout</a>
        </div>
      </div>
    </li>
  </ul>
</nav>
