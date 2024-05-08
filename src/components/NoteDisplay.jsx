import Showdown from 'showdown';
import PropTypes from 'prop-types'; // Importe PropTypes

const converter = new Showdown.Converter(); // Définir le convertisseur Showdown

const NoteDisplay = ({ title, markdownValue }) => {
  const htmlContent = converter.makeHtml(markdownValue);

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

NoteDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  markdownValue: PropTypes.string.isRequired
};

export default NoteDisplay;
