import { ajax } from 'discourse/lib/ajax';
import ModalFunctionality from 'discourse/mixins/modal-functionality';

export default Ember.Controller.extend(ModalFunctionality, {
  actions: {
    edit () {
      ajax('/translator/improve', {
        type: 'POST',
        data: {
          post_id: this.get('model.post.id'),
          translated_text: this.get('model.translated_text')
        }
      }).then(() => {
        this.send('closeModal');
        this.set('model.post.translated_text', this.get('model.translated_text'));
      }).catch(err => {
        this.flash(err.errorThrown, 'alert-error');
      });
    }
  }
});
