<template>
  <div class="w-full">
    <div class="max-w-md w-full space-y-8 m-auto">
      <div>
        <h1 class="p-12 text-center text-6xl font-extrabold text-black">
          Welcome to Switch Link
        </h1>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="account-number" class="sr-only">Account Number</label>
            <input
              id="account-number"
              name="account-number"
              type="number"
              required
              v-model="credentials.accountNumber"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Account Number"
            />
            <div
              v-if="error.errors.accountNumber"
              class="invalid-feedback fw-bolder"
            >
              {{ error.errors.accountNumber.toString() }}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/useAuth";
import { useErrorStore } from "../store/useError";

const credentials = ref({});
const loading = ref(false);
const router = useRouter();
const error = useErrorStore();

const onSubmit = () => {
  console.log("Submit is working: ", credentials);
  loading.value = !loading.value;
  useAuthStore()
    .accountLogin(credentials.value)
    .then((res) => {
      console.log("Res is: ", res);
      return router.push({ name: "pin" });
    })
    .catch(() => (loading.value = !loading.value));
};
onBeforeUnmount(() => error.$reset());
</script>
