/** @jsx React.DOM */
(function() {

  var WPTForm = React.createClass({
    // Default options
    fieldsDefaults: [
      {
        key: 'k',
        label: 'API Key',
        value: '',
        isRequired: true
      },
      {
        key: 'location',
        label: 'Location + browser',
        value: 'Dulles_MotoE',
        isRequired: true
      },
      {
        key: 'runs',
        label: 'Number of runs',
        value: 1,
        isRequired: true
      },
      {
        key: 'fvonly',
        label: 'First and repeat view?',
        type: 'radio',
        value: 0,
        options: [
          {
            value: 0,
            label: 'Yes'
          },
          {
            value: 1,
            label: 'No'
          }
        ],
      },
      {
        key: 'video',
        label: 'Video',
        value: 1
      },
      {
        key: 'url',
        label: 'URL to test',
        value: '',
        isRequired: true
      },
      {
        key: 'label',
        label: 'Label',
        value: '',
      }
    ],

    getInitialState: function() {
      var fieldsInitial = this.fieldsDefaults,
          i;

      // Initialize any options not stored in localStorage based on model
      for (i = 0; i < fieldsInitial.length; i++) {
        fieldsInitial[i].value = fieldsData.get(fieldsInitial[i].key) || fieldsInitial[i].value;
      }

      return {
        fields: fieldsInitial
      };
    },

    render: function() {
      var fieldNodes = this.state.fields.map(function(field) {
        return (
          <WPTField key={field.key} id={field.key} label={field.label} value={field.value} type={field.type} options={field.options} required={field.isRequired} />
        );
      });
      return (
        <form style={styles.form} onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <WPTCloseButton />
          <h2 style={styles.h2}>
            Run WebPageTest for this page
          </h2>
          {fieldNodes}
          <button type="submit" style={styles.button}>Test it</button>
        </form>
      );
    },

    handleChange: function(evt) {
      fieldsData.set(event.target.name, event.target.value);
    },

    handleSubmit: function(evt) {
      var url_base = 'http://www.webpagetest.org/runtest.php?',
          query    = '',
          i;

      evt.preventDefault();

      for (i = 0; i < this.state.options.length; i++) {
        query += '&' + this.state.options[i].key + '=' + encodeURIComponent(this.state.options[i].value);
      }
      window.open(url_base + query.substr(1));
      React.unmountComponentAtNode(container);
    }
  });

  var WPTField = React.createClass({
    getInitialState: function() {
      return {
        value: this.props.value
      };
    },
    handleChange: function(event) {
      this.setState({
        value: event.target.value
      });
    },
    render: function() {
      var type       = this.props.type || 'text',
          isRequired = !!this.props.isRequired,
          id         = this.props.id,
          name       = id,
          options    = this.props.options || [{
            value: this.state.value,
            label: this.props.label
          }],
          isRadio    = type === 'radio' && options.length > 1,
          optionNodes;

      optionNodes = options.map(function(option) {
        if (isRadio) {
          id = this.props.id + '[' + option.value + ']';
        }
        // Use defaultValue and defaultChecked for uncontrolled input components
        return (
          <label style={styles.label}>
            {!isRadio ? option.label : ''}
            <input type={type} onChange={this.handleChange} style={styles.input[type]} id={id} name={name} defaultValue={option.value} required={isRequired} defaultChecked={isRadio && parseInt(this.state.value, 10) === parseInt(option.value, 10)} />
            {isRadio ? option.label : ''}
          </label>
        );
      }, this);

      return (
        <p>
          {isRadio ? this.props.label : ''}
          {optionNodes}
        </p>
      );
    }
  });

  var WPTCloseButton = React.createClass({
    handleClick: function(event) {
      React.unmountComponentAtNode(container);
    },
    render: function() {
      return (
        <button style={styles.closeButton} onClick={this.handleClick}>
          Close
          <svg style={styles.closeButtonIcon} viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="11"
                  x2="11" y2="1"
                  stroke="black"
                  stroke-width="2"/>
            <line x1="1" y1="1"
                  x2="11" y2="11"
                  stroke="black"
                  stroke-width="2"/>
          </svg>
        </button>
      );
    }
  });

  var fieldsData = (function() {
    var isCodepen = location.hostname.indexOf('codepen.io') > -1,
        data      = JSON.parse(localStorage.wpt_options || '{}'),
        custom    = {
          url: function() {
            var url = location.href;
            if (isCodepen) {
              // Insert "s" as subdomain
              url  = location.origin.replace(/(https?:\/\/)codepen.io/, '$1s.codepen.io');
              url += location.pathname.replace('/pen/', '/debug/');
            }
            return url;
          },
          label: function() {
            var title = document.title;
            if (!title) {
              title = document.querySelector('h1');
              if (title !== null) {
                title = title.textContent;
              } else {
                title = '';
              }
            }
            // If custom logic is needed for any site, insert it here
            return title;
          }
        };
    return {
      get: function(key) {
        // Add logic to determine when to use localStorage and when to use current document
        if (custom[key]) {
          return custom[key]();
        }
        return data[key];
      },
      set: function(key, value) {
        data[key] = value;
        if (key === 'fvonly') {
          console.log(data[key]);
        }
        localStorage.wpt_options = JSON.stringify(data);
      }
    };
  })();
  var fontFamily = '"Myriad Pro", "Myriad Set Pro", Myriad, "Helvetica Neue", Helvetica, sans-serif',
      accentColor = 'rgb(251, 144, 8)';
  var styles = {
    form: {
      position: 'fixed',
      width: '50%',
      minWidth: '320px',
      maxWidth: '500px',
      bottom: '0',
      left: '50%',
      // For Safari 8
      WebkitTransform: 'translate(-50%, 0)',
      transform: 'translate(-50%, 0)',
      boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'white',
      padding: '0 1em 1em',
      margin: '0 auto',
      fontSize: '14px',
      fontFamily: fontFamily,
      textShadow: 'none',
    },
    h2: {
      color: 'rgb(60, 60, 60)',
      lineHeight: '1.3',
    },
    button: {
      fontFamily: fontFamily,
      fontSize: '1.25em',
      backgroundColor: accentColor,
      color: 'white',
      border: 'none',
      borderRadius: '0.25em',
      padding: '0.25em 0.55em',
      marginTop: '0.5em',
    },
    label: {
      overflow: 'hidden',
      lineHeight: '1.5',
      color: 'rgb(90, 90, 90)',
    },
    input: {
      text: {
        float: 'right',
        padding: '0.2em 0.4em',
        width: '60%',
        boxModel: 'border-box',
      },
      radio: {
        margin: '0 0.5em 0 1em'
      }
    },
    closeButton: {
      position: 'absolute',
      right: '0.25em',
      top: '0.85em',
      width: '20px',
      height: '0',
      padding: '20px 0 0',
      border: '0',
      backgroundColor: 'white',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    closeButtonIcon: {
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '18px',
      height: '18px',
    }
  };

  var container = document.createElement('div');
  document.body.appendChild(container);
  React.render(<WPTForm />, container);
}());
