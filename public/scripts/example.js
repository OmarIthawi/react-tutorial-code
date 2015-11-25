// tutorial.js
var CommentBox = React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => this.setState({data: data}),
      error: (xhr, status, err) => console.error(xhr, status, err)
    });
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>

        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    )
  }
});

var Comment = React.createClass({
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});

    return {
      __html: rawMarkup
    };
  },
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>

        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentsNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentsNodes}
      </div>
    );
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
  <CommentBox url="/api/comments.json" pollInterval={330} />,
  document.getElementById('content')
);
