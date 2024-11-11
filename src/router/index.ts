import { useBlockchain } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import { setupLayouts } from "virtual:generated-layouts";
// @ts-ignore
import routes from "~pages";

// Add redirect from '/' to '/PersonaPulse'
const updatedRoutes = [
  { path: "/", redirect: "/PersonaPulse" },
  ...setupLayouts(routes)
];

// Initialize the router with updated routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: updatedRoutes
});

//update current blockchain
router.beforeEach((to) => {
    // const { chain } = to.params
  const chain = "PersonaPulse"
    if(chain){
      const blockchain= useBlockchain()
      if(chain !== blockchain.chainName) {
        blockchain.setCurrent(chain.toString())
      }
    } 
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router;