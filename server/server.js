const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.redirect('/home/1');
});

app.get('/home/:homeId', function(req, res) {
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

app.use(express.static(path.join(__dirname, 'public')));

// //Reviews
const reviewsOptions = {
  target: 'http://3.17.145.71',
  changeOrigin: true
};
const reviewsProxy = proxy(reviewsOptions);
app.use('/api/home/:homeId/reviews', reviewsProxy);

// //Calendar and Booking
const calendarOptions = {
  target: 'http://18.224.149.154',
  changeOrigin: true
};
const calendarProxy = proxy(calendarOptions);
app.use('/bookings', calendarProxy);

// app.get('/booking', function(req, res) {
//   axios.get('http://18.224.149.154/booking')
//     .then((bookings) => {
//       res.send(bookings.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });


// app.get('/map', (req, res) => {
//   axios.get('http://ec2-54-183-66-46.us-west-1.compute.amazonaws.com:3001/map')
//   .then(function(response){
//     res.send(response.data);
//   });
 
//  }
//  );
 
 const mapOptions = {
    target: 'http://ec2-54-183-66-46.us-west-1.compute.amazonaws.com:3001',
    changeOrigin: true
  };
  const mapProxy = proxy(mapOptions);
  app.use('/map', mapProxy);
  
//  app.get('/recommendations', (req, res) => {
//   axios.get('http://ec2-54-183-66-46.us-west-1.compute.amazonaws.com:3001/recommendations')
//   .then(function(response){
//     res.send(response.data);
//   });
//   })

 
  const recommendationsOptions = {
    target: 'http://ec2-54-183-66-46.us-west-1.compute.amazonaws.com:3001',
    changeOrigin: true
  };
  const recommendationsProxy = proxy(recommendationsOptions);
  app.use('/recommendations', recommendationsProxy);

  // app.get('/gallery', function(req, res) {
  //   axios
  //     .get("http://ec2-52-15-165-182.us-east-2.compute.amazonaws.com/gallery")
  //     .then(function(response) {
  //       res.send(response.data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // });

  const galleryOptions = {
    target: 'http://localhost:9999',
    changeOrigin: true
  };
  const galleryProxy = proxy(galleryOptions);
  app.use('/home/1/gallery', galleryProxy);

//server
app.listen(PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`);
});

//Map and Recommendation
// const mapOptions = {
//   target: 'http://localhost:3001',
//   changeOrigin: true
// };
// const mapProxy = proxy(mapOptions);
// app.use('/api/map', mapProxy);

// const recommendationOptions = {
//   target: 'http://localhost:3001',
//   changeOrigin: true
// };
// const recommendationProxy = proxy(recommendationOptions);
// app.use('/api/recommendations', recommendationProxy);

// app.get('/map', (req, res) => {
//   axios.get('http://localhost:3001/map')
//   .then(function(response){
//     // console.log(response.data); // ex.: { user: 'Your User'}
//     // console.log(response.status); // ex.: 200
//     res.send(response.data);
//   });   
// });


// app.get('/recommendations', (req, res) => {
//   axios.get('http://localhost:3001/recommendations')
//   .then(function(response){
//     // console.log(response.data); // ex.: { user: 'Your User'}
//     // console.log(response.status); // ex.: 200
//     res.send(response.data);
//   });  
//   })

//Photo Stream
// const photosOptions = {
//   target: 'http://3.17.132.23',
//   changeOrigin: true
// };
// const photosProxy = proxy(photosOptions);
// app.use('/api/home/:homeId/gallery', photosProxy);

// app.get('/gallery', function(req, res) {
//   axios.get('http://3.17.132.23')
//     .then(function (response) {
//       // console.log('*********** response.data: ******', response.data);
//       res.send(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });


// // Proxy Server
// const express = require('express');
// const path = require('path');
// // const morgan = require('morgan');
// const axios = require('axios');
// const app = express();
// // app.set('PORT', 3000);
// // app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../public')));
// app.get('/', function(req, res) {
//   res.send();
// });


// // const express = require('express');
// // const path = require('path');
// // const app = express();
// const proxy = require('http-proxy-middleware');
// // const axios = require('axios');

// const PORT = process.env.PORT || 3000;

// // app.get('/', function(req, res) {
// //   res.redirect('/home/1');
// // });

// // app.get('/home/:homeId', function(req, res) {
// //   const reactPath = path.join(__dirname, '../public/index.html');
// //   res.sendFile(reactPath);
// // });

// // app.use(express.static(path.join(__dirname, 'public')));

// // const reviewsOptions = {
// //   target: 'http://3.17.145.71',
// //   changeOrigin: true
// // };
// // const reviewsProxy = proxy(reviewsOptions);
// // app.use('/api/home/:homeId/reviews', reviewsProxy);

// app.get('/reviews', function(req, res) {
//   axios
//     .get("http://3.17.145.71/api/home/1/reviews")
//     .then(function(response) {
//       // console.log('*********** response.data: ******', response.data);
//       res.send(response.data);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// });


// app.get('/gallery', function(req, res) {
//   axios
//     .get("http://ec2-52-15-165-182.us-east-2.compute.amazonaws.com/gallery")
//     .then(function(response) {
//       // console.log('*********** response.data: ******', response.data);
//       res.send(response.data);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// });
// app.get('/booking', function(req, res) {
//   axios.get('http://18.224.149.154/booking')
//     .then((bookings) => {
//       res.send(bookings.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// // app.get('/home/:homeId', (req, res) => {
// //   axios.get('http://localhost:3002/home/:homeId')
// //     .then(function (response) {
// //       res.sendfile(response.data);
// //     })
// //     .catch(function (error) {
// //       console.log(error);
// //     });
// // });

 
//  app.get('/recommendations', (req, res) => {
//   axios.get('http://ec2-54-183-66-46.us-west-1.compute.amazonaws.com:3001/recommendations')
//   .then(function(response){
//     res.send(response.data);
//   });
//   })

// app.get('/map', (req, res) => {
//   axios.get('http://ec2-54-183-66-46.us-west-1.compute.amazonaws.com:3001/map')
//   .then(function(response){
//     res.send(response.data);
//   });
 
//  }
//  );
// app.listen(PORT, function() {
//   console.log(`Proxy Server running HARD on port ${PORT}`);
// });