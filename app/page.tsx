import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Wellcome to Air BNB</h1>;
      <Button variant="outline" size="lg" className="capitalize m-8">
        click me
      </Button>
    </div>
  );
};

export default HomePage;
