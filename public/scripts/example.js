// tutorial1.js
var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="commentBox">
        Hello, World! I am a CommentBox.
      </div>
    )
  }
});


var CommentForm = React.createClass({
  render: function () {
    return (
      <div className="commentForm">
        Hello, World! I am a CommentForm.
      </div>
    );
  }
});


ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
