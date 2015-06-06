// Load dependencies
var React = require("react/addons");

// Load constants
var UpdateFormConstants = require("../constants/updateForm");

// Load utility functions
var getCurrentLocation = require("../../client/utils/getCurrentLocation");


// Construct an OpenStreetMap embeddable URL from some params
var constructOSMURL = function (currentLocation) {

    var latitude = currentLocation.latitude,
        longitude = currentLocation.longitude;

    var viewBounds = {
            left: longitude - 0.1,
            top: latitude - 0.1,
            right: longitude + 0.1,
            bottom: latitude + 0.1
        };

    var url = "http://www.openstreetmap.org/export/embed.html?bbox=";

    url += viewBounds.left + ",";
    url += viewBounds.bottom + ",";
    url += viewBounds.right + ",";
    url += viewBounds.top;
    url += "&layer=mapnik&marker=";
    url += latitude + ",";
    url += longitude;

    return url;

};


// Exports
var UpdateFormLocationOptionComponent = module.exports = React.createClass({

    _viewState: {
        locationState: UpdateFormConstants.Types.LOCATION_FETCHING,
        coords: null
    },

    _onLocationFound: function (err, coords) {

        if (!err) {

            this._viewState.locationState = UpdateFormConstants.Types.LOCATION_DISCOVERING;
            this._viewState.coords = coords;
            this.setState(this._viewState);
            // Start discovering nearby places

        } else {

            this._viewState.locationState = UpdateFormConstants.Types.LOCATION_ERROR;
            this.setState(this._viewState);

        }

    },

    componentWillMount: function () {
        this._viewState.locationState = UpdateFormConstants.Types.LOCATION_FETCHING;
        getCurrentLocation(this._onLocationFound);
    },

    getInitialState: function () {
        return this._viewState;
    },

    render: function () {

        switch (this.state.locationState) {

            case UpdateFormConstants.Types.LOCATION_FETCHING:

                return (
                    <div className="location fetching">
                        <div className="info">Fetching location...</div>
                    </div>
                );

            case UpdateFormConstants.Types.LOCATION_DISCOVERING:

                return (
                    <div className="location discovering">
                        <div className="info">Discovering nearby places...</div>
                        <iframe className="map" src={constructOSMURL(this.state.coords)}></iframe>
                    </div>
                );

            case UpdateFormConstants.Types.LOCATION_FOUND:

                return (
                    <div className="location picker">
                        <div className="info">Success!</div>
                    </div>
                );

            default:

                return (
                    <div className="location error">
                        <div className="info">Error discovering location</div>
                    </div>
                );

        }

    }
});