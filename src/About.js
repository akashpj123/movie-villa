import React from 'react'
import '../src/App.css'
function About() {
  return (
    
    <footer>
    <div className="jumbotron jumbotron-fluid bg-secondary p-4 mt-5 mb-0">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 cizgi">
            <div className="card bg-secondary border-0">
              <div className="card-body text-light text-center">
                <h5 className="card-title text-white display-4" style={{ fontSize: '30px' }}>Telif Hakkı</h5>
                <p className="d-inline lead">
                  Tüm Hakları Saklıdır © 2018<br />
                  <a href="#" className="text-light d-block lead">Blog</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 cizgi">
            <div className="card bg-secondary border-0">
              <div className="card-body text-center">
                <h5 className="card-title text-white display-4" style={{ fontSize: '30px' }}>İletişim</h5>
                <a className="text-light d-block lead" style={{ marginLeft: '-20px' }} href="#">
                  <i className="fa fa-phone mr-2"></i>+90 (000) 000 0 000
                </a>
                <a className="text-light d-block lead" href="#">
                  <i className="fa fa-envelope mr-2"></i>admin@localhost.com
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className="card bg-secondary border-0">
              <div className="card-body text-center">
                <h5 className="card-title text-white display-4" style={{ fontSize: '30px' }}>Sosyal Medya</h5>
                <a className="text-light" href="#">
                  <i className="fa fa-facebook-square fa-fw fa-2x"></i>
                </a>
                <a className="text-light" href="#">
                  <i className="fa fa-twitter-square fa-fw fa-2x"></i>
                </a>
                <a className="text-light" href="#">
                  <i className="fa fa-instagram fa-fw fa-2x"></i>
                </a>
                <a className="text-light" href="#">
                  <i className="fa fa-linkedin fa-fw fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
}
export default About