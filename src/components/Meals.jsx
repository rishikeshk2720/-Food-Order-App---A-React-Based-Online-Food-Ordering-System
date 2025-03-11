import useHttps from "../hooks/useHttps";
import MealItem from "./MealItem";
import Error from "./Error";
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    loading,
    error,
  } = useHttps("http://localhost:3000/meals", requestConfig, []);
  if (loading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <>
      <ul className="meals">
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
