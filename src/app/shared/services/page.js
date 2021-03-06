angular.module('cerebro').factory('PageService', ['DataService', '$rootScope',
  '$document', function(DataService, $rootScope, $document) {

    var link = $document[0].querySelector('link[rel~=\'icon\']');
    var clusterName;
    var clusterStatus;

    if (link) {
      var faviconUrl = link.href;
      var img = $document[0].createElement('img');
      img.src = faviconUrl;
    }

    this.setup = function(newName, newStatus) {
      setPageTitle(newName);
      setFavIconColor(newStatus);
    };

    var setPageTitle = function(newClusterName) {
      if (clusterName !== newClusterName) {
        if (newClusterName) {
          clusterName = newClusterName;
          $rootScope.title = 'cerebro[' + clusterName + ']';
        } else {
          clusterName = undefined;
          $rootScope.title = 'cerebro - no connection';
        }
      }
    };

    var setFavIconColor = function(newClusterStatus) {
      if (link) {
        clusterStatus = newClusterStatus;
        try {
          var colors = {green: '#1AC98E', yellow: '#E4D836', red: '#E64759'};
          var color = clusterStatus ? colors[clusterStatus] : '#222426';
          var canvas = $document[0].createElement('canvas');
          canvas.width = 32;
          canvas.height = 34;
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          context.globalCompositeOperation = 'source-in';
          context.fillStyle = color;
          context.fillRect(0, 0, 32, 34);
          context.fill();
          link.type = 'image/png';
          link.href = canvas.toDataURL();
        } catch (exception) {
          //
        }
      }
    };

    return this;

  }]);
