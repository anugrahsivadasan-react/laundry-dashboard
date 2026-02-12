// import ServicesHeader from "../../components/ServicesAndPricing/ServicesHeader"
import ServiceTypesPage from "./ServiceTypesPage";
import ServicesHeader from "../../components/ServicesAndPricing/ServicesHeader";
import Pricing from "../../components/ServicesAndPricing/Pricing";
import Premium from "../../components/ServicesAndPricing/Premium";


const ServicesAndPricing = () => {

  return (
    <div className="p-6">

            {/* <ServicesHeader /> */}

            <ServicesHeader />

      <div className="pt-6">
      <ServiceTypesPage />
      </div>
      <div className="pt-6">

        <Pricing />
      </div>


      <div className="pt-6">

        <Premium />
      </div>




    </div>
  )
}

export default ServicesAndPricing