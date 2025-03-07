import {JSDOM} from 'jsdom';
import DOMPurify from 'dompurify';

        const window = new JSDOM('').window;
        const purify = DOMPurify(window)

        const sanitizeContet = (htmlContent) => {
          return purify.sanitize(htmlContent)
         }


        export default sanitizeContet