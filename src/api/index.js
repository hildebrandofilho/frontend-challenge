const RESTAURANT = "/api/challenge/venue/9";
const MENU = "/api/challenge/menu";

async function fetchRestaurants() {
   try {
      const response = await fetch(RESTAURANT);

      console.log("Resposta da API de restaurantes:", response);

      if (!response.ok) {
         throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Erro na API de restaurantes:", error);
      return null;
   }
}

async function fetchMenu() {
   try {
      const response = await fetch(MENU);
      if (!response.ok) {
         throw new Error(`Erro ${response.status}: Não foi possível carregar o menu`);
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Erro na API do menu:", error);
      return null;
   }
}

export { fetchRestaurants, fetchMenu };
