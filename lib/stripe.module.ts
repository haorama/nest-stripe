import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { StripeModuleOptions } from "./interfaces";
import Stripe from 'stripe';
import { WebhookService } from "./webhook.service";
import { DiscoveryModule } from "@nestjs/core";

@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    const stripeProvider: Provider = {
      provide: Stripe,
      useValue: new Stripe(options.secretKey, options.stripeConfig),
    }

    return {
      module: StripeModule,
      global: options.global ?? true,
      providers: [WebhookService, stripeProvider],
      exports: [WebhookService, Stripe],
      imports: [DiscoveryModule]
    }
  }
}