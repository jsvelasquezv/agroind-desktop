'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var mainWindow = null;

app.on('ready', function () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024, 
    height: 700,
    // fullscreen: true,
    autoHideMenuBar: true
  });

  
  mainWindow.loadURL('file://' + __dirname + '/app/index.html')
  
  mainWindow.on('closed', function () {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

});