import React, { Component } from "react";
import { UserForm } from "./components/user/UserForm";
import Home from "./components/home/Home";
import { Route, Switch } from "react-router-dom";
import { PromosiKost } from "./components/user/PromosiKost";
// Testing User Login Register
import Login from "./components/user/login-register/Login";
import Profile from "./components/user/login-register/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ErrorPage from "./components/ErrorPage";
import OwnerLogin from "./components/user/login-register/OwnerLogin";
import CariKost from "./components/cari-kost/CariKost";
import { InputProperty } from "./components/property/InputProperty";
import LoadingScreen from "./components/utilities/LoadingScreen";
import { OwnerRegister } from "./components/user/login-register/OwnerRegister";
import { OwnerDashboard } from "./components/owner/OwnerDashboard";
import { GuestUpdateProfile } from "./components/user/profile/GuestUpdateProfile";
import { UpdatePhone } from "./components/user/profile/UpdatePhone";
import { VerifyPhone } from "./components/user/profile/VerifyPhone";
// import { sendChat, socket, connect } from "./Api";
import { ManageGuest } from "./components/admin/ManageGuest";
import { KostView } from "./components/kost/KostView";
import { InputApartment } from "./components/apartment/InputApartment";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import { ManageOwner } from "./components/admin/ManageOwner";
import { SearchProperty } from "./components/property/SearchProperty";
import ManagePost from "./components/admin/ManagePost";
import ChatTest from "./components/chat/ChatTest";
import UploadImage from "./components/UploadImage";
import DataKost from "./components/owner/DataKost";
import KostPage from "./components/owner/KostPage";
import TextEditor from "./components/admin/TextEditor";
import UpdateKost from "./components/owner/UpdateKost";
import CreatePost from "./components/admin/CreatePost";
import PostPage from "./components/admin/PostPage";
import UpdatePost from "./components/admin/UpdatePost";
import ManageFacility from "./components/admin/ManageFacility";
import { getGuestData } from "./components/admin/AdminFunctions";
import GuestData from "./components/admin/GuestData";
import DataApart from "./components/owner/DataApart";
import GuestKostPage from "./components/kost/GuestKostPage";
import ApartPage from "./components/owner/ApartPage";
import UpdateFacility from "./components/facilities/UpdateFacility";
import ManagePremium from "./components/admin/ManagePremium";
import CreatePremium from "./components/admin/CreatePremium";
import PremiumPage from "./components/admin/PremiumPage";
import UpdatePremium from "./components/admin/UpdatePremium";
import PremiumPromo from "./components/admin/PremiumPromo";
import { ViewPremium } from "./components/owner/ViewPremium";
import ManageTransaction from "./components/admin/ManageTransaction";
import CheckoutPage from "./components/owner/CheckoutPage";
import CompleteTransactions from "./components/admin/CompleteTransactions";
import IncompleteTransactions from "./components/admin/IncompleteTransactions";
import IncompleteData from "./components/admin/IncompleteData";
import ManageReport from "./components/admin/ManageReport";
import ReportPage from "./components/admin/ReportPage";
import AllPosts from "./components/home/AllPosts";
import PostDetail from "./components/home/PostDetail";
import PostDetails from "./components/home/PostDetails";
import OwnerPage from "./components/home/OwnerPage";
import OwnerDetail from "./components/home/OwnerDetail";
import ApartDetail from "./components/home/ApartDetail";
import KostDetail from "./components/home/KostDetail";
import HistoryPremium from "./components/owner/HistoryPremium";
import TransactionData from "./components/owner/TransactionData";
import GuestProfilePage from "./components/user/profile/GuestProfilePage";
import HistoryPage from "./components/user/profile/HistoryPage";
import LatestViews from "./components/user/profile/LatestViews";
import KostLatestViews from "./components/user/profile/KostLatestViews";
import FavouritePage from "./components/user/profile/FavouritePage";
import FavouriteKost from "./components/user/profile/FavouriteKost";
import FavouriteApart from "./components/user/profile/FavouriteApart";
import FollowingPage from "./components/user/profile/FollowingPage";
import UpdateApart from "./components/owner/UpdateApart";
import ChatRedis from "./components/chat/ChatRedis";
import ChatPage from "./components/user/ChatPage";

class App extends Component {
  // constructor() {
  //   super();
  //   connect(
  //     "3",
  //     msg => {
  //       console.log("Jalan weh connectnya");
  //     }
  //   );
  // }
  // send() {
  //   socket.emit("newMessage", "1", "helloooo send jalan nih");
  // }

  render() {
    return (
      <React.Fragment>
        {/* <ChatTest /> */}
        {/* <UploadImage/> */}
        {/* <ChatRedis /> */}
        {
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  component={() => <Home socketSend={this.send} />}
                />
                <Route exact path="/user-form" component={UserForm} />
                <Route exact path="/search-property" component={SearchProperty} />

                <Route exact path="/guest-login" component={Login} />
                <Route exact path="/guest-page" component={Login} />
                <Route exact path="/guest-profile-page" component={GuestProfilePage} />
                <Route exact path="/guest-following-page" component={FollowingPage} />

                <Route exact path="/promosi-kost" component={PromosiKost} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/owner-login" component={OwnerLogin} />
                <Route
                  exact
                  path="/owner-update-profile"
                  component={UpdateProfile}
                />
                <Route path="/cari-kost" component={CariKost} />
                <Route path="/update-phone" component={UpdatePhone} />
                <Route path="/guest-update" component={GuestUpdateProfile} />
                <Route exact path="/owner-register" component={OwnerRegister} />
                <Route
                  exact
                  path="/owner-dashboard"
                  component={OwnerDashboard}
                />
                <Route exact path="/input-kost" component={InputProperty} />
                <Route
                  exact
                  path="/enter-phone-token"
                  component={VerifyPhone}
                />
                <Route exact path="/admin" component={AdminDashboard} />
                <Route
                  exact
                  path="/manage-guest"
                  component={ManageGuest}
                />
                <Route
                  exact
                  path="/manage-report"
                  component={ManageReport}
                />
                <Route
                  exact
                  path="/report/:id"
                  component={ReportPage}
                />
                <Route
                  exact
                  path="/user/:id"
                  component={GuestData}
                />
                <Route
                  exact
                  path="/owner-page"
                  component={OwnerPage}
                />
                <Route
                  exact
                  path="/manage-post"
                  component={ManagePost}
                />
                <Route
                  exact
                  path="/admin-create-post"
                  component={CreatePost}
                />
                <Route exact path="/input-apt" component={InputApartment} />
                <Route
                  exact
                  path="/manage-owner"
                  component={ManageOwner}
                />
                <Route
                  exact
                  path="/data-kost"
                  component={DataKost}
                />
                <Route
                  exact
                  path="/posts-page"
                  component={AllPosts}
                />
                <Route
                  exact
                  path="/data-apartment"
                  component={DataApart}
                />
                <Route exact path='/facility/update' component={UpdateFacility} />
                <Route exact path='/manage-facility' component={ManageFacility} />
                <Route
                  exact
                  path="/post-details/:id"
                  component={PostDetails}
                />
                <Route
                  exact
                  path="/post-detail/:id"
                  component={PostDetail}
                />
                <Route
                  exact
                  path="/chat"
                  component={ChatPage}
                />
                <Route
                  exact
                  path="/owner-detail/:id"
                  component={OwnerDetail}
                />
                <Route exact path='/post/update/:id' component={UpdatePost} />
                <Route exact path='/post/:id' component={PostPage} />
                <Route exact path='/view-premium' component={ViewPremium} />
                <Route exact path='/view-history-premium' component={HistoryPremium} />
                <Route exact path='/view-history' component={HistoryPage} />
                <Route exact path='/view-history/latest-views' component={LatestViews} />
                <Route exact path='/view-history/favourite' component={FavouritePage} />
                <Route exact path='/view-history/favourite/kost' component={FavouriteKost} />
                <Route exact path='/view-history/favourite/apartment' component={FavouriteApart} />

                <Route exact path='/buy-premium/:id' component={CheckoutPage} />
                <Route exact path='/detail-transaction/:id' component={TransactionData} />

                <Route exact path='/premium/:id' component={PremiumPage} />
                <Route exact path='/premium/update/:id' component={UpdatePremium} />
                <Route exact path='/premium/promo/:id' component={PremiumPromo} />

                <Route exact path='/apart-:handle' component={ApartPage} />
                <Route exact path='/apart/detail-:handle' component={ApartDetail} />
                <Route exact path='/kost/detail-:handle' component={KostDetail} />

                <Route exact path='/kost-:handle' component={KostPage} />
                <Route exact path='/manage-premium' component={ManagePremium} />
                <Route exact path='/manage-transaction' component={ManageTransaction} />
                <Route exact path='/incomplete-transactions' component={IncompleteTransactions} />
                <Route exact path='/transactions/incomplete/:id' component={IncompleteData} />

                <Route exact path='/complete-transactions' component={CompleteTransactions} />

                <Route exact path='/admin-create-premium' component={CreatePremium} />
                <Route exact path='/detail/kost-:handle' component={GuestKostPage} />
                <Route exact path='/update-kost-:handle' component={UpdateKost} />
                <Route exact path='/update-apart/:handle' component={UpdateApart} />

                <Route path="" component={ErrorPage} />
              </Switch>
            )}
          />
        }
        {/* <UploadImage/> */}
        {/* <TextEditor/> */}
        {/* <SearchProperty /> */}
        {/* <ManageGuest /> */}
        {/* <KostView /> */}
        {/* <InputApartment /> */}
        {/* <LoadingScreen /> */}
        {/* <InputProperty /> */}
      </React.Fragment>
    );
  }
}

export default App;
