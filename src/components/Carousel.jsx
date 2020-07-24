import React, { Component } from "react";
import Slider from "react-slick";
import IconButton from "@material-ui/core/IconButton";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  hideNav: {
    visibility: "hidden",
  },
  nav: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 9,
    padding: 0,
  },
  next: {
    left: "100%",
  },
  prev: {
    right: "100%",
  },
});

function CustomNextArrow(props) {
  const { className, onClick } = props;
  const classes = useStyles();

  const nextClassName = className.includes("slick-disabled")
    ? `${classes.hideNav} ${classes.nav} ${classes.next}`
    : `${classes.next} ${classes.nav}`;

  return (
    <IconButton className={nextClassName} aria-label="next" onClick={onClick}>
      <NavigateNext fontSize="large" />
    </IconButton>
  );
}

function CustomPrevArrow(props) {
  const { className, onClick } = props;
  const classes = useStyles();

  const prevClassName = className.includes("slick-disabled")
    ? `${classes.hideNav} ${classes.nav} ${classes.prev}`
    : `${classes.prev} ${classes.nav}`;

  return (
    <IconButton className={prevClassName} aria-label="prev" onClick={onClick}>
      <NavigateBefore fontSize="large" />
    </IconButton>
  );
}

class Carousel extends Component {
  render() {
    const { sliderChange } = this.props;

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      beforeChange: (index) => sliderChange(index),
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    };

    return <Slider {...settings}>{this.props.children}</Slider>;
  }
}

export default Carousel;
