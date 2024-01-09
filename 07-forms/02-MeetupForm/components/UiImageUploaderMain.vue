<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading' : uploading}"
      :style="labelStyle"
    >
      <span class="image-uploader__text">
        {{ message }}
      </span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        :disabled="uploading"
        @click="clickImageHandler"
        @change="selectImageHandler"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploaderMain',

  inheritAttrs: false,

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      selectedImage: undefined,

      selectedFile: undefined,

      uploading: false,

      previewProxy: this.preview,
    }
  },

  props: {
    preview: {
      type: String,
      required: false,
    },
    uploader: {
      type: Function,
      required: false,
    }
  },

  computed: {
    selectedImageURL() {
      if (this.selectedImage?.image) return this.selectedImage.image;
      return null
    },

    message() {
      if (this.selectedImage?.image || this.previewProxy) return 'Удалить изображение';
      if (!this.selectedImage?.image && !this.uploading) return 'Загрузить изображение';
      if (!this.selectedImage?.image && this.uploading) return 'Загрузка...';
      return ''
    },

    labelStyle() {
      if (this.previewProxy) return {'--bg-url': `url(${this.previewProxy})`}
      if (!this.previewProxy && this.selectedImage?.image) return {'--bg-url': `url(${this.selectedImageURL})`}
      return {}
    },
  },

  methods: {
    clickImageHandler(evt) {
      if (this.previewProxy) {
        evt.preventDefault();
        this.previewProxy = null;
        this.$emit('remove')
      };

      if (this.selectedFile) {
        evt.preventDefault();
        this.$refs.input.value = "";
        this.selectedImage = undefined;
        this.selectedFile = undefined;
        this.$emit('remove')
      }
    },

    async selectImageHandler(evt) {

      this.selectedFile = this.$refs.input.files[0]

      if (this.uploader) {
        this.uploading = true;
        try {
          const uploadingResult = await this.uploader(this.selectedFile);
          this.selectedImage = uploadingResult
          this.$emit('upload', uploadingResult)
        } catch (err) {
          this.$refs.input.value = undefined;
          this.$emit('error', err)
        } finally {
          this.uploading = false;
        }
      } else {
        this.selectedImage = {
          id: 1,
          image: URL.createObjectURL(this.selectedFile)
        }
      }
      this.$emit('select', this.selectedFile)
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
