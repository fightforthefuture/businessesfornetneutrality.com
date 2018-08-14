<style lang="scss">
$item-width: 31.5rem;
$item-padding: 3rem;

.media-page {
  .item {
    background-color: $section-bg-odd;
  }

  section:nth-child(odd) .item {
    background-color: $darkGray;
  }

  .gallery {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: auto;
    margin-left: $item-padding * -0.5;

    @include mobile {
      width: 100%;
    }

    .item {
      width: $item-width;
      height: $item-width;
      margin: 2rem;
      padding: 3rem;
      border-radius: 16px;
      position: relative;
      color: inherit;

      label {
        position: absolute;
        top: 1rem;
        left: $item-padding;
        right: $item-padding;
        font-size: 1.2rem;
        width: $item-width - ($item-padding * 2);
        text-align: center;
      }

      img {
        max-width: $item-width * .64;
        max-height: $item-width * .64;
        margin-bottom: 3rem;
        margin-top: 1rem;
      }

      .btn {
        // background-color: #403657;
        border-radius: 16px;
        font-size: 1.3rem;
        position: absolute;
        bottom: 1.2rem;
        left: $item-padding;
        right: $item-padding;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:after {
          content: "";
          background-image: url("~/assets/images/download.svg");
          background-size: 100% auto;
          background-repeat: no-repeat;
          height: 1.5rem;
          width: 1.5rem;
          margin-left: 0.5rem;
        }
      }

      &:hover {
        cursor: pointer;
        // background-color: lighten(#181421, 2%);
        transform: scale(1.02);
        transition: background-color .3s, transform .2s;

        .btn {
          // background-color: lighten(#403657, 10%);
          transition: background-color .2s;
        }
      }
    }
  }
}
</style>

<template>
  <div class="media-page">
    <div class="container">
      <section class="page-header">
        <h1>Social Media Images</h1>
        <div class="intro">
          <p>Share these images on social media to show your support for net neutrality</p>
        </div>
      </section>
      <section>
        <div class="gallery">
          <a v-for="image in images" :key="image" class="item flex-center" :href="image" target="_blank">
            <label class="truncate">{{ imageLabel(image) }}</label>
            <img :src="`${image}`" :alt="image">
            <span class="btn">Download</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import images from '~/assets/data/media'

export default {
  computed: {
    images: () => images
  },

  methods: {
    imageLabel(image) {
      return image.split('/').pop().split('@')[0].replace(/\.(png|jpg|jpeg|gif)$/i, '')
    }
  }
}
</script>
