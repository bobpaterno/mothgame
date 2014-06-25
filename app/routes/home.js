'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'Node.js: Home'});
};
