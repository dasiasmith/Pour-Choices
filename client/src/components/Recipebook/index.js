import React from "react";
import bookBack from "../../assets/bookbackground.jpg";
import HTMLFlipBook from "react-pageflip";
import "./recipeBook.css";

const RecipeBook = () => {
  return (
    <div>
      <HTMLFlipBook
        width={300}
        height={500}
        showCover={true}
        style={{
          backgroundImage: `url(${bookBack})`,
          border: "solid red 1px",
        }}
      >
        <div className="page page-cover page-cover-top" data-density="hard">
          <div className="page-content">
            <h2>BOOK TITLE</h2>
          </div>
        </div>
        <div className="page">
          <div className="page-content">
            <h2 className="page-header">Page header 1</h2>
            <div
              className="page-image"
              // style={{background-image: url(images/html/1.jpg)}}
            ></div>
            <div className="page-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
              mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
              Aenean vitae pellentesque erat. Integer non tristique quam.
              Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
              viverra metus, a venenatis tellus tellus id magna. Aliquam ac
              nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non
              justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. In cursus
              mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
              Aenean vitae pellentesque erat. Integer non tristique quam.
              Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
              viverra metus, a venenatis tellus tellus id magna.
            </div>
            <div className="page-footer">2</div>
          </div>
        </div>
        {/* <!-- PAGES .... --> */}
        <div className="page">
          <div className="page-content">
            <h2 className="page-header">Page header - 15</h2>
            <div
              className="page-image"
              // style="background-image: url(images/html/7.jpg)"
            ></div>
            <div className="page-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
              mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
              Aenean vitae pellentesque erat. Integer non tristique quam.
              Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
              viverra metus, a venenatis tellus tellus id magna. Aliquam ac
              nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non
              justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. In cursus
              mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
              Aenean vitae pellentesque erat. Integer non tristique quam.
              Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
              viverra metus, a venenatis tellus tellus id magna.
            </div>
            <div className="page-footer">16</div>
          </div>
        </div>
        <div className="page">
          <div className="page-content">
            <h2 className="page-header">Page header - 16</h2>
            <div
              className="page-image"
              // style="background-image: url(images/html/8.jpg)"
            ></div>
            <div className="page-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
              mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
              Aenean vitae pellentesque erat. Integer non tristique quam.
              Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
              viverra metus, a venenatis tellus tellus id magna. Aliquam ac
              nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non
              justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. In cursus
              mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
              Aenean vitae pellentesque erat. Integer non tristique quam.
              Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
              viverra metus, a venenatis tellus tellus id magna.
            </div>
            <div className="page-footer">17</div>
          </div>
        </div>
        <div className="page page-cover page-cover-bottom" data-density="hard">
          <div className="page-content">
            <h2>THE END</h2>
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default RecipeBook;
