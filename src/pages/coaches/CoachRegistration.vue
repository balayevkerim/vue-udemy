<template>
  <section>
    <base-card>
      <h3>Coach Registration</h3>

      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
          <label for="firstname">First Name</label>
          <input
            type="text"
            v-model.trim="firstName.val"
            id="firstname"
            @blur="clearValidity(firstName)"
          />
          <p v-if="!firstName.isValid">First Name is required</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
          <label for="lastname">Last Name</label>

          <input
            type="text"
            v-model.trim="lastName.val"
            id="lastname"
            @blur="clearValidity(lastName)"
          />
          <p v-if="!lastName.isValid">Name is required</p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
          <label for="desc">Description</label>

          <textarea
            id="desc"
            v-model.trim="description.val"
            cols="10"
            rows="5"
            @blur="clearValidity(description)"
          ></textarea>
          <p v-if="!description.isValid">Description is required</p>
        </div>
        <div class="form-control" :class="{ invalid: !rate.isValid }">
          <label for="rate">Hourly Rate</label>

          <input
            type="number"
            v-model="rate.val"
            id="rate"
            @blur="clearValidity(rate)"
          />
          <p v-if="!rate.isValid">Rate is required</p>
        </div>
        <div :class="{ invalid: !areas.isValid }">
          <div class="form-control">
            <h3>Area of Expertise</h3>

            <input
              type="checkbox"
              v-model="areas.val"
              id="frontend"
              value="frontend"
              @blur="clearValidity(areas)"
            />
            <label for="frontend">Frontend</label>
          </div>
          <div class="form-control">
            <input
              type="checkbox"
              v-model="areas.val"
              id="backend"
              value="backend"
              @blur="clearValidity(areas)"
            />
            <label for="backend">Backend</label>
          </div>
          <div class="form-control">
            <input
              type="checkbox"
              v-model="areas.val"
              id="career"
              value="career"
              @blur="clearValidity(areas)"
            />
            <label for="career">Career</label>

            <p v-if="!areas.isValid">Area is required</p>
          </div>
        </div>

        <base-button>Submit Form</base-button>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: true,
      firstName: {
        isValid: true,
        val: '',
      },
      lastName: {
        isValid: true,
        val: '',
      },
      description: {
        isValid: true,
        val: '',
      },
      rate: {
        isValid: true,
        val: '',
      },
      areas: {
        isValid: true,
        val: [],
      },
    };
  },
  methods: {
    clearValidity(field) {
      field.isValid = true;
    },
    markInvalidField(field) {
      field.isValid = false;
      this.isFormValid = false;
    },
    validateForm() {
      this.isFormValid = true;
      if (this.firstName.val == '') {
        this.markInvalidField(this.firstName);
      }
      if (this.lastName.val == '') {
        this.markInvalidField(this.lastName);
      }
      if (this.description.val == '') {
        this.markInvalidField(this.description);
      }
      if (this.rate.val == '' || this.rate.val <0) {
        this.markInvalidField(this.rate);
      }
      if (this.areas.val.length == 0) {
        this.markInvalidField(this.areas);
      }
    },

    submitForm() {
      this.isFormValid = true;
      this.validateForm();
      if (!this.isFormValid) {
        return;
      }
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>