import "./HeaderApp.css";

function HeaderApp() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Travel</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/74IE6MW3QFCIFHTLHMFX3O4GKQ.jpg"
        alt=""
      />
    </div>
  );
}
export default HeaderApp;
