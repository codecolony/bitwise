


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>CodeFlower/javascripts/CodeFlower.js at master · fzaninotto/CodeFlower</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="https://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <meta property="og:image" content="https://github.global.ssl.fastly.net/images/modules/logos_page/Octocat.png">
    <meta name="hostname" content="fe16.rs.github.com">
    <link rel="assets" href="https://github.global.ssl.fastly.net/">
    <link rel="xhr-socket" href="/_sockets" />
    
    


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" /><meta content="4730640" name="octolytics-actor-id" /><meta content="codecolony" name="octolytics-actor-login" /><meta content="af64347e9e8b71ea7abad4327eb96c2f1e7a5036c1d01af6e83a3746f4e32219" name="octolytics-actor-hash" />

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="q+QSU24WBCHfenuXTwAkTB9eH58xQDWogPgWK63EAJI=" name="csrf-token" />

    <link href="https://github.global.ssl.fastly.net/assets/github-c6ca95663cba6496fe7a5bdd98671b82cd956df3.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://github.global.ssl.fastly.net/assets/github2-d35b02ba3940bde9b9f2c3e58f2dfb1ceff5886c.css" media="all" rel="stylesheet" type="text/css" />
    


      <script src="https://github.global.ssl.fastly.net/assets/frameworks-eae23340ab2a6ba722166712e699c87aaf60ad8f.js" type="text/javascript"></script>
      <script src="https://github.global.ssl.fastly.net/assets/github-a72a714a307592a4803dc7bed1e49523e71ff53e.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="babad972cb81ce7ba9200a9ccc34ae98">

        <link data-pjax-transient rel='permalink' href='/fzaninotto/CodeFlower/blob/6be1e8665e2e1a69497d38c7e7c19272bda1043c/javascripts/CodeFlower.js'>
  <meta property="og:title" content="CodeFlower"/>
  <meta property="og:type" content="githubog:gitrepository"/>
  <meta property="og:url" content="https://github.com/fzaninotto/CodeFlower"/>
  <meta property="og:image" content="https://github.global.ssl.fastly.net/images/gravatars/gravatar-user-420.png"/>
  <meta property="og:site_name" content="GitHub"/>
  <meta property="og:description" content="CodeFlower - Source code visualization utility written in JavaScript with d3.js. Does your code look beautiful?"/>

  <meta name="description" content="CodeFlower - Source code visualization utility written in JavaScript with d3.js. Does your code look beautiful?" />

  <meta content="99944" name="octolytics-dimension-user_id" /><meta content="fzaninotto" name="octolytics-dimension-user_login" /><meta content="8552495" name="octolytics-dimension-repository_id" /><meta content="fzaninotto/CodeFlower" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="8552495" name="octolytics-dimension-repository_network_root_id" /><meta content="fzaninotto/CodeFlower" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/fzaninotto/CodeFlower/commits/master.atom" rel="alternate" title="Recent Commits to CodeFlower:master" type="application/atom+xml" />

  </head>


  <body class="logged_in page-blob windows vis-public env-production ">

    <div class="wrapper">
      
      
      


      <div class="header header-logged-in true">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/">
  <span class="mega-octicon octicon-mark-github"></span>
</a>

    <div class="divider-vertical"></div>

      <a href="/notifications" class="notification-indicator tooltipped downwards" title="You have no unread notifications">
    <span class="mail-status all-read"></span>
  </a>
  <div class="divider-vertical"></div>


      <div class="command-bar js-command-bar  in-repository">
          <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    data-username="codecolony"
      data-repo="fzaninotto/CodeFlower"
      data-branch="master"
      data-sha="5901e087856a671dfc33b05e73ea7ed82d9381b2"
  >

    <input type="hidden" name="nwo" value="fzaninotto/CodeFlower" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item js-this-repository-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item js-all-repositories-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="octicon help tooltipped downwards" title="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
        <ul class="top-nav">
            <li class="explore"><a href="/explore">Explore</a></li>
            <li><a href="https://gist.github.com">Gist</a></li>
            <li><a href="/blog">Blog</a></li>
          <li><a href="https://help.github.com">Help</a></li>
        </ul>
      </div>

    

  

    <ul id="user-links">
      <li>
        <a href="/codecolony" class="name">
          <img height="20" src="https://secure.gravatar.com/avatar/c79ec04269bbdb536e26f30f143cee6d?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /> codecolony
        </a>
      </li>

        <li>
          <a href="/new" id="new_repo" class="tooltipped downwards" title="Create a new repo" aria-label="Create a new repo">
            <span class="octicon octicon-repo-create"></span>
          </a>
        </li>

        <li>
          <a href="/settings/profile" id="account_settings"
            class="tooltipped downwards"
            aria-label="Account settings "
            title="Account settings ">
            <span class="octicon octicon-tools"></span>
          </a>
        </li>
        <li>
          <a class="tooltipped downwards" href="/logout" data-method="post" id="logout" title="Sign out" aria-label="Sign out">
            <span class="octicon octicon-log-out"></span>
          </a>
        </li>

    </ul>


<div class="js-new-dropdown-contents hidden">
  

<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo-create"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>



    <li class="section-title">
      <span title="fzaninotto/CodeFlower">This repository</span>
    </li>
    <li>
      <a href="/fzaninotto/CodeFlower/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
    </li>
</ul>

</div>


    
  </div>
</div>

      

      




          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="q+QSU24WBCHfenuXTwAkTB9eH58xQDWogPgWK63EAJI=" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="8552495" />

    <div class="select-menu js-menu-container js-select-menu">
        <a class="social-count js-social-count" href="/fzaninotto/CodeFlower/watchers">
          7
        </a>
      <span class="minibutton select-menu-button with-count js-menu-target">
        <span class="js-select-button">
          <span class="octicon octicon-eye-watch"></span>
          Watch
        </span>
      </span>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content">
          <div class="select-menu-header">
            <span class="select-menu-title">Notification status</span>
            <span class="octicon octicon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container">

            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">You only receive notifications for discussions in which you participate or are @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye-watch"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">You receive notifications for all discussions in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye-unwatch"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">You do not receive any notifications for discussions in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
  
<div class="js-toggler-container js-social-container starring-container ">
  <a href="/fzaninotto/CodeFlower/unstar" class="minibutton with-count js-toggler-target star-button starred upwards" title="Unstar this repo" data-remote="true" data-method="post" rel="nofollow">
    <span class="octicon octicon-star-delete"></span><span class="text">Unstar</span>
  </a>
  <a href="/fzaninotto/CodeFlower/star" class="minibutton with-count js-toggler-target star-button unstarred upwards " title="Star this repo" data-remote="true" data-method="post" rel="nofollow">
    <span class="octicon octicon-star"></span><span class="text">Star</span>
  </a>
  <a class="social-count js-social-count" href="/fzaninotto/CodeFlower/stargazers">82</a>
</div>

  </li>


        <li>
          <a href="/fzaninotto/CodeFlower/fork" class="minibutton with-count js-toggler-target fork-button lighter upwards" title="Fork this repo" rel="nofollow" data-method="post">
            <span class="octicon octicon-git-branch-create"></span><span class="text">Fork</span>
          </a>
          <a href="/fzaninotto/CodeFlower/network" class="social-count">42</a>
        </li>


</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author">
            <a href="/fzaninotto" class="url fn" itemprop="url" rel="author"><span itemprop="title">fzaninotto</span></a></span
          ><span class="repohead-name-divider">/</span><strong
          ><a href="/fzaninotto/CodeFlower" class="js-current-repository js-repo-home-link">CodeFlower</a></strong>

          <span class="page-context-loader">
            <img alt="Octocat-spinner-32" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">

      <div class="repository-with-sidebar repo-container ">

        <div class="repository-sidebar">
            

<div class="repo-nav repo-nav-full js-repository-container-pjax js-octicon-loaders">
  <div class="repo-nav-contents">
    <ul class="repo-menu">
      <li class="tooltipped leftwards" title="Code">
        <a href="/fzaninotto/CodeFlower" aria-label="Code" class="js-selected-navigation-item selected" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /fzaninotto/CodeFlower">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped leftwards" title="Issues">
          <a href="/fzaninotto/CodeFlower/issues" aria-label="Issues" class="js-selected-navigation-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /fzaninotto/CodeFlower/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>3</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped leftwards" title="Pull Requests"><a href="/fzaninotto/CodeFlower/pulls" aria-label="Pull Requests" class="js-selected-navigation-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /fzaninotto/CodeFlower/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>0</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


        <li class="tooltipped leftwards" title="Wiki">
          <a href="/fzaninotto/CodeFlower/wiki" aria-label="Wiki" class="js-selected-navigation-item " data-pjax="true" data-selected-links="repo_wiki /fzaninotto/CodeFlower/wiki">
            <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>
    </ul>
    <div class="repo-menu-separator"></div>
    <ul class="repo-menu">

      <li class="tooltipped leftwards" title="Pulse">
        <a href="/fzaninotto/CodeFlower/pulse" aria-label="Pulse" class="js-selected-navigation-item " data-pjax="true" data-selected-links="pulse /fzaninotto/CodeFlower/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Graphs">
        <a href="/fzaninotto/CodeFlower/graphs" aria-label="Graphs" class="js-selected-navigation-item " data-pjax="true" data-selected-links="repo_graphs repo_contributors /fzaninotto/CodeFlower/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Network">
        <a href="/fzaninotto/CodeFlower/network" aria-label="Network" class="js-selected-navigation-item js-disable-pjax" data-selected-links="repo_network /fzaninotto/CodeFlower/network">
          <span class="octicon octicon-git-branch"></span> <span class="full-word">Network</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

    </ul>

  </div>
</div>

            <div class="only-with-full-nav">
              

  

<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>

  <input type="text" class="clone js-url-field"
         value="https://github.com/fzaninotto/CodeFlower.git" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/fzaninotto/CodeFlower.git" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>

  

<div class="clone-url "
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><strong>SSH</strong> clone URL</h3>

  <input type="text" class="clone js-url-field"
         value="git@github.com:fzaninotto/CodeFlower.git" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="git@github.com:fzaninotto/CodeFlower.git" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>

  <input type="text" class="clone js-url-field"
         value="https://github.com/fzaninotto/CodeFlower" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/fzaninotto/CodeFlower" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>



<p class="clone-options">You can clone with
    <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
    <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
    <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>,
  and <a href="https://help.github.com/articles/which-remote-url-should-i-use">other methods.</a>
</p>


  <a href="github-windows://openRepo/https://github.com/fzaninotto/CodeFlower" class="minibutton sidebar-button">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>

                <a href="/fzaninotto/CodeFlower/archive/master.zip"
                   class="minibutton sidebar-button"
                   title="Download this repository as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
            </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:d652ee0c947445fe898a6e0c6fc7d569 -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:d652ee0c947445fe898a6e0c6fc7d569 -->

<p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

<a href="/fzaninotto/CodeFlower/find/master" data-pjax data-hotkey="t" style="display:none">Show File Finder</a>

<div class="file-navigation">
  


<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target" data-hotkey="w"
    data-master-branch="master"
    data-ref="master">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax>

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-remove-close js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/fzaninotto/CodeFlower/blob/gh-pages/javascripts/CodeFlower.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="gh-pages" data-skip-pjax="true" rel="nofollow" title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/fzaninotto/CodeFlower/blob/master/javascripts/CodeFlower.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="master" data-skip-pjax="true" rel="nofollow" title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/fzaninotto/CodeFlower" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">CodeFlower</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/fzaninotto/CodeFlower/tree/master/javascripts" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">javascripts</span></a></span><span class="separator"> / </span><strong class="final-path">CodeFlower.js</strong> <span class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="javascripts/CodeFlower.js" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


  
  <div class="commit file-history-tease">
    <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/8ad62a25686796c42fedbe3ddedce1f1?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
    <span class="author"><a href="/fzaninotto" rel="author">fzaninotto</a></span>
    <time class="js-relative-date" datetime="2013-03-04T04:15:04-08:00" title="2013-03-04 04:15:04">March 04, 2013</time>
    <div class="commit-title">
        <a href="/fzaninotto/CodeFlower/commit/e9af70b1f2851b3730fb18cc20bd35bc8a8639c3" class="message" data-pjax="true" title="Initial release">Initial release</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>1</strong> contributor</a></p>
      
    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
        <li class="facebox-user-list-item">
          <img height="24" src="https://secure.gravatar.com/avatar/8ad62a25686796c42fedbe3ddedce1f1?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/fzaninotto">fzaninotto</a>
        </li>
      </ul>
    </div>
  </div>


<div id="files" class="bubble">
  <div class="file">
    <div class="meta">
      <div class="info">
        <span class="icon"><b class="octicon octicon-file-text"></b></span>
        <span class="mode" title="File Mode">file</span>
          <span>149 lines (122 sloc)</span>
        <span>4.167 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
                <a class="minibutton tooltipped leftwards"
                   title="Clicking this button will automatically fork this project so you can edit the file"
                   href="/fzaninotto/CodeFlower/edit/master/javascripts/CodeFlower.js"
                   data-method="post" rel="nofollow">Edit</a>
          <a href="/fzaninotto/CodeFlower/raw/master/javascripts/CodeFlower.js" class="button minibutton " id="raw-url">Raw</a>
            <a href="/fzaninotto/CodeFlower/blame/master/javascripts/CodeFlower.js" class="button minibutton ">Blame</a>
          <a href="/fzaninotto/CodeFlower/commits/master/javascripts/CodeFlower.js" class="button minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->
            <a class="minibutton danger empty-icon tooltipped downwards"
               href="/fzaninotto/CodeFlower/delete/master/javascripts/CodeFlower.js"
               title="Fork this project and delete file" data-method="post" rel="nofollow">
            Delete
          </a>
      </div><!-- /.actions -->

    </div>
        <div class="blob-wrapper data type-javascript js-blob-data">
      <table class="file-code file-diff">
        <tr class="file-code-line">
          <td class="blob-line-nums">
            <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>

          </td>
          <td class="blob-line-code">
                  <div class="highlight"><pre><div class='line' id='LC1'><span class="kd">var</span> <span class="nx">CodeFlower</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">selector</span><span class="p">,</span> <span class="nx">w</span><span class="p">,</span> <span class="nx">h</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC2'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">w</span><span class="p">;</span></div><div class='line' id='LC3'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">h</span><span class="p">;</span></div><div class='line' id='LC4'><br/></div><div class='line' id='LC5'>&nbsp;&nbsp;<span class="nx">d3</span><span class="p">.</span><span class="nx">select</span><span class="p">(</span><span class="nx">selector</span><span class="p">).</span><span class="nx">selectAll</span><span class="p">(</span><span class="s2">&quot;svg&quot;</span><span class="p">).</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC6'><br/></div><div class='line' id='LC7'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">svg</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">select</span><span class="p">(</span><span class="nx">selector</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span><span class="s2">&quot;svg:svg&quot;</span><span class="p">)</span></div><div class='line' id='LC8'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;width&#39;</span><span class="p">,</span> <span class="nx">w</span><span class="p">)</span></div><div class='line' id='LC9'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;height&#39;</span><span class="p">,</span> <span class="nx">h</span><span class="p">);</span></div><div class='line' id='LC10'><br/></div><div class='line' id='LC11'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">svg</span><span class="p">.</span><span class="nx">append</span><span class="p">(</span><span class="s2">&quot;svg:rect&quot;</span><span class="p">)</span></div><div class='line' id='LC12'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">style</span><span class="p">(</span><span class="s2">&quot;stroke&quot;</span><span class="p">,</span> <span class="s2">&quot;#999&quot;</span><span class="p">)</span></div><div class='line' id='LC13'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">style</span><span class="p">(</span><span class="s2">&quot;fill&quot;</span><span class="p">,</span> <span class="s2">&quot;#fff&quot;</span><span class="p">)</span></div><div class='line' id='LC14'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;width&#39;</span><span class="p">,</span> <span class="nx">w</span><span class="p">)</span></div><div class='line' id='LC15'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;height&#39;</span><span class="p">,</span> <span class="nx">h</span><span class="p">);</span></div><div class='line' id='LC16'><br/></div><div class='line' id='LC17'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">force</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">layout</span><span class="p">.</span><span class="nx">force</span><span class="p">()</span></div><div class='line' id='LC18'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;tick&quot;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">tick</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">))</span></div><div class='line' id='LC19'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">charge</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">_children</span> <span class="o">?</span> <span class="o">-</span><span class="nx">d</span><span class="p">.</span><span class="nx">size</span> <span class="o">/</span> <span class="mi">100</span> <span class="o">:</span> <span class="o">-</span><span class="mi">40</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC20'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">linkDistance</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">_children</span> <span class="o">?</span> <span class="mi">80</span> <span class="o">:</span> <span class="mi">25</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC21'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">size</span><span class="p">([</span><span class="nx">h</span><span class="p">,</span> <span class="nx">w</span><span class="p">]);</span></div><div class='line' id='LC22'><span class="p">};</span></div><div class='line' id='LC23'><br/></div><div class='line' id='LC24'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">update</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">json</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC25'>&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">json</span><span class="p">)</span> <span class="k">this</span><span class="p">.</span><span class="nx">json</span> <span class="o">=</span> <span class="nx">json</span><span class="p">;</span></div><div class='line' id='LC26'><br/></div><div class='line' id='LC27'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">json</span><span class="p">.</span><span class="nx">fixed</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC28'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">json</span><span class="p">.</span><span class="nx">x</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">w</span> <span class="o">/</span> <span class="mi">2</span><span class="p">;</span></div><div class='line' id='LC29'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">json</span><span class="p">.</span><span class="nx">y</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">h</span> <span class="o">/</span> <span class="mi">2</span><span class="p">;</span></div><div class='line' id='LC30'><br/></div><div class='line' id='LC31'>&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">nodes</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">flatten</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">json</span><span class="p">);</span></div><div class='line' id='LC32'>&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">links</span> <span class="o">=</span> <span class="nx">d3</span><span class="p">.</span><span class="nx">layout</span><span class="p">.</span><span class="nx">tree</span><span class="p">().</span><span class="nx">links</span><span class="p">(</span><span class="nx">nodes</span><span class="p">);</span></div><div class='line' id='LC33'>&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">total</span> <span class="o">=</span> <span class="nx">nodes</span><span class="p">.</span><span class="nx">length</span> <span class="o">||</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC34'><br/></div><div class='line' id='LC35'>&nbsp;&nbsp;<span class="c1">// remove existing text (will readd it afterwards to be sure it&#39;s on top)</span></div><div class='line' id='LC36'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">svg</span><span class="p">.</span><span class="nx">selectAll</span><span class="p">(</span><span class="s2">&quot;text&quot;</span><span class="p">).</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC37'><br/></div><div class='line' id='LC38'>&nbsp;&nbsp;<span class="c1">// Restart the force layout</span></div><div class='line' id='LC39'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">force</span></div><div class='line' id='LC40'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">gravity</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">atan</span><span class="p">(</span><span class="nx">total</span> <span class="o">/</span> <span class="mi">50</span><span class="p">)</span> <span class="o">/</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">PI</span> <span class="o">*</span> <span class="mf">0.4</span><span class="p">)</span></div><div class='line' id='LC41'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">nodes</span><span class="p">(</span><span class="nx">nodes</span><span class="p">)</span></div><div class='line' id='LC42'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">links</span><span class="p">(</span><span class="nx">links</span><span class="p">)</span></div><div class='line' id='LC43'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">start</span><span class="p">();</span></div><div class='line' id='LC44'><br/></div><div class='line' id='LC45'>&nbsp;&nbsp;<span class="c1">// Update the links</span></div><div class='line' id='LC46'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">link</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">svg</span><span class="p">.</span><span class="nx">selectAll</span><span class="p">(</span><span class="s2">&quot;line.link&quot;</span><span class="p">)</span></div><div class='line' id='LC47'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="nx">links</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">name</span><span class="p">;</span> <span class="p">});</span></div><div class='line' id='LC48'><br/></div><div class='line' id='LC49'>&nbsp;&nbsp;<span class="c1">// Enter any new links</span></div><div class='line' id='LC50'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">link</span><span class="p">.</span><span class="nx">enter</span><span class="p">().</span><span class="nx">insert</span><span class="p">(</span><span class="s2">&quot;svg:line&quot;</span><span class="p">,</span> <span class="s2">&quot;.node&quot;</span><span class="p">)</span></div><div class='line' id='LC51'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;class&quot;</span><span class="p">,</span> <span class="s2">&quot;link&quot;</span><span class="p">)</span></div><div class='line' id='LC52'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;x1&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">source</span><span class="p">.</span><span class="nx">x</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC53'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;y1&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">source</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC54'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;x2&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">x</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC55'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;y2&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span> <span class="p">});</span></div><div class='line' id='LC56'><br/></div><div class='line' id='LC57'>&nbsp;&nbsp;<span class="c1">// Exit any old links.</span></div><div class='line' id='LC58'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">link</span><span class="p">.</span><span class="nx">exit</span><span class="p">().</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC59'><br/></div><div class='line' id='LC60'>&nbsp;&nbsp;<span class="c1">// Update the nodes</span></div><div class='line' id='LC61'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">node</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">svg</span><span class="p">.</span><span class="nx">selectAll</span><span class="p">(</span><span class="s2">&quot;circle.node&quot;</span><span class="p">)</span></div><div class='line' id='LC62'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="nx">nodes</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">name</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC63'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">classed</span><span class="p">(</span><span class="s2">&quot;collapsed&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">_children</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">:</span> <span class="mi">0</span><span class="p">;</span> <span class="p">});</span></div><div class='line' id='LC64'><br/></div><div class='line' id='LC65'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">node</span><span class="p">.</span><span class="nx">transition</span><span class="p">()</span></div><div class='line' id='LC66'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;r&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">children</span> <span class="o">?</span> <span class="mf">3.5</span> <span class="o">:</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">pow</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">size</span><span class="p">,</span> <span class="mi">2</span><span class="o">/</span><span class="mi">5</span><span class="p">)</span> <span class="o">||</span> <span class="mi">1</span><span class="p">;</span> <span class="p">});</span></div><div class='line' id='LC67'><br/></div><div class='line' id='LC68'>&nbsp;&nbsp;<span class="c1">// Enter any new nodes</span></div><div class='line' id='LC69'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">node</span><span class="p">.</span><span class="nx">enter</span><span class="p">().</span><span class="nx">append</span><span class="p">(</span><span class="s1">&#39;svg:circle&#39;</span><span class="p">)</span></div><div class='line' id='LC70'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;class&quot;</span><span class="p">,</span> <span class="s2">&quot;node&quot;</span><span class="p">)</span></div><div class='line' id='LC71'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">classed</span><span class="p">(</span><span class="s1">&#39;directory&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">_children</span> <span class="o">||</span> <span class="nx">d</span><span class="p">.</span><span class="nx">children</span><span class="p">)</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">:</span> <span class="mi">0</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC72'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;r&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">children</span> <span class="o">?</span> <span class="mf">3.5</span> <span class="o">:</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">pow</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">size</span><span class="p">,</span> <span class="mi">2</span><span class="o">/</span><span class="mi">5</span><span class="p">)</span> <span class="o">||</span> <span class="mi">1</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC73'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">style</span><span class="p">(</span><span class="s2">&quot;fill&quot;</span><span class="p">,</span> <span class="kd">function</span> <span class="nx">color</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC74'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="s2">&quot;hsl(&quot;</span> <span class="o">+</span> <span class="nb">parseInt</span><span class="p">(</span><span class="mi">360</span> <span class="o">/</span> <span class="nx">total</span> <span class="o">*</span> <span class="nx">d</span><span class="p">.</span><span class="nx">id</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span> <span class="o">+</span> <span class="s2">&quot;,90%,70%)&quot;</span><span class="p">;</span></div><div class='line' id='LC75'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">})</span></div><div class='line' id='LC76'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">force</span><span class="p">.</span><span class="nx">drag</span><span class="p">)</span></div><div class='line' id='LC77'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;click&quot;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">click</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">))</span></div><div class='line' id='LC78'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;mouseover&quot;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">mouseover</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">))</span></div><div class='line' id='LC79'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;mouseout&quot;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">mouseout</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">));</span></div><div class='line' id='LC80'><br/></div><div class='line' id='LC81'>&nbsp;&nbsp;<span class="c1">// Exit any old nodes</span></div><div class='line' id='LC82'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">node</span><span class="p">.</span><span class="nx">exit</span><span class="p">().</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC83'><br/></div><div class='line' id='LC84'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">text</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">svg</span><span class="p">.</span><span class="nx">append</span><span class="p">(</span><span class="s1">&#39;svg:text&#39;</span><span class="p">)</span></div><div class='line' id='LC85'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;class&#39;</span><span class="p">,</span> <span class="s1">&#39;nodetext&#39;</span><span class="p">)</span></div><div class='line' id='LC86'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;dy&#39;</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span></div><div class='line' id='LC87'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;dx&#39;</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span></div><div class='line' id='LC88'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;text-anchor&#39;</span><span class="p">,</span> <span class="s1">&#39;middle&#39;</span><span class="p">);</span></div><div class='line' id='LC89'><br/></div><div class='line' id='LC90'>&nbsp;&nbsp;<span class="k">return</span> <span class="k">this</span><span class="p">;</span></div><div class='line' id='LC91'><span class="p">};</span></div><div class='line' id='LC92'><br/></div><div class='line' id='LC93'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">flatten</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">root</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC94'>&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">nodes</span> <span class="o">=</span> <span class="p">[],</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC95'><br/></div><div class='line' id='LC96'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">recurse</span><span class="p">(</span><span class="nx">node</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC97'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">node</span><span class="p">.</span><span class="nx">children</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC98'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">node</span><span class="p">.</span><span class="nx">size</span> <span class="o">=</span> <span class="nx">node</span><span class="p">.</span><span class="nx">children</span><span class="p">.</span><span class="nx">reduce</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">p</span><span class="p">,</span> <span class="nx">v</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC99'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">p</span> <span class="o">+</span> <span class="nx">recurse</span><span class="p">(</span><span class="nx">v</span><span class="p">);</span></div><div class='line' id='LC100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC101'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC102'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">node</span><span class="p">.</span><span class="nx">id</span><span class="p">)</span> <span class="nx">node</span><span class="p">.</span><span class="nx">id</span> <span class="o">=</span> <span class="o">++</span><span class="nx">i</span><span class="p">;</span></div><div class='line' id='LC103'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">nodes</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">node</span><span class="p">);</span></div><div class='line' id='LC104'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">node</span><span class="p">.</span><span class="nx">size</span><span class="p">;</span></div><div class='line' id='LC105'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC106'><br/></div><div class='line' id='LC107'>&nbsp;&nbsp;<span class="nx">root</span><span class="p">.</span><span class="nx">size</span> <span class="o">=</span> <span class="nx">recurse</span><span class="p">(</span><span class="nx">root</span><span class="p">);</span></div><div class='line' id='LC108'>&nbsp;&nbsp;<span class="k">return</span> <span class="nx">nodes</span><span class="p">;</span></div><div class='line' id='LC109'><span class="p">};</span></div><div class='line' id='LC110'><br/></div><div class='line' id='LC111'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">click</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC112'>&nbsp;&nbsp;<span class="c1">// Toggle children on click.</span></div><div class='line' id='LC113'>&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">children</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC114'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span><span class="p">.</span><span class="nx">_children</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">children</span><span class="p">;</span></div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span><span class="p">.</span><span class="nx">children</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC116'>&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC117'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span><span class="p">.</span><span class="nx">children</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">_children</span><span class="p">;</span></div><div class='line' id='LC118'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span><span class="p">.</span><span class="nx">_children</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC119'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC120'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC121'><span class="p">};</span></div><div class='line' id='LC122'><br/></div><div class='line' id='LC123'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">mouseover</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC124'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">text</span><span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;transform&#39;</span><span class="p">,</span> <span class="s1">&#39;translate(&#39;</span> <span class="o">+</span> <span class="nx">d</span><span class="p">.</span><span class="nx">x</span> <span class="o">+</span> <span class="s1">&#39;,&#39;</span> <span class="o">+</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">y</span> <span class="o">-</span> <span class="mi">5</span> <span class="o">-</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">children</span> <span class="o">?</span> <span class="mf">3.5</span> <span class="o">:</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">size</span><span class="p">)</span> <span class="o">/</span> <span class="mi">2</span><span class="p">))</span> <span class="o">+</span> <span class="s1">&#39;)&#39;</span><span class="p">)</span></div><div class='line' id='LC125'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">name</span> <span class="o">+</span> <span class="s2">&quot;: &quot;</span> <span class="o">+</span> <span class="nx">d</span><span class="p">.</span><span class="nx">size</span> <span class="o">+</span> <span class="s2">&quot; loc&quot;</span><span class="p">)</span></div><div class='line' id='LC126'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">style</span><span class="p">(</span><span class="s1">&#39;display&#39;</span><span class="p">,</span> <span class="kc">null</span><span class="p">);</span></div><div class='line' id='LC127'><span class="p">};</span></div><div class='line' id='LC128'><br/></div><div class='line' id='LC129'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">mouseout</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC130'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">text</span><span class="p">.</span><span class="nx">style</span><span class="p">(</span><span class="s1">&#39;display&#39;</span><span class="p">,</span> <span class="s1">&#39;none&#39;</span><span class="p">);</span></div><div class='line' id='LC131'><span class="p">};</span></div><div class='line' id='LC132'><br/></div><div class='line' id='LC133'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">tick</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC134'>&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">h</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">h</span><span class="p">;</span></div><div class='line' id='LC135'>&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">w</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">w</span><span class="p">;</span></div><div class='line' id='LC136'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">link</span><span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;x1&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">source</span><span class="p">.</span><span class="nx">x</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC137'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;y1&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">source</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC138'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;x2&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">x</span><span class="p">;</span> <span class="p">})</span></div><div class='line' id='LC139'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;y2&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span> <span class="p">});</span></div><div class='line' id='LC140'><br/></div><div class='line' id='LC141'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">node</span><span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;transform&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC142'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="s2">&quot;translate(&quot;</span> <span class="o">+</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="nx">w</span> <span class="o">-</span> <span class="mi">5</span><span class="p">,</span> <span class="nx">d</span><span class="p">.</span><span class="nx">x</span><span class="p">))</span> <span class="o">+</span> <span class="s2">&quot;,&quot;</span> <span class="o">+</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="nx">h</span> <span class="o">-</span> <span class="mi">5</span><span class="p">,</span> <span class="nx">d</span><span class="p">.</span><span class="nx">y</span><span class="p">))</span> <span class="o">+</span> <span class="s2">&quot;)&quot;</span><span class="p">;</span></div><div class='line' id='LC143'>&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC144'><span class="p">};</span></div><div class='line' id='LC145'><br/></div><div class='line' id='LC146'><span class="nx">CodeFlower</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">cleanup</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC147'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">([]);</span></div><div class='line' id='LC148'>&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">force</span><span class="p">.</span><span class="nx">stop</span><span class="p">();</span></div><div class='line' id='LC149'><span class="p">};</span></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2013 <span title="0.06787s from fe16.rs.github.com">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/fzaninotto/CodeFlower/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-remove-close close ajax-error-dismiss"></a>
      Something went wrong with that request. Please try again.
    </div>

    
  </body>
</html>

