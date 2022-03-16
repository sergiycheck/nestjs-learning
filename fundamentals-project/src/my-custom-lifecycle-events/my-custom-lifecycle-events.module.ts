import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
})
export class MyCustomLifecycleEventsModule {}

/* Bootstrapping starts		-		Nest core bootstrapping

onModuleInit									For each module, ofter module initialization:
															- await child controller
															- await module onModuleInit() method

onApplicationBootstrap 				For each module:
															- await child controller & provider onApplicationBootstrap() methods
															- await module onApplicationBootstrap() method

Start listeners								For HTTP server, WS server, each microservice:
															- await connections open/ready 
Application is running				Normal application processing

																	Termination signal received

onModuleDestroy								For each module
															- await child controller & provider onModuleDestroy() methods
															- await module onModuleDestroy() method

beforeApplicationShutdown			For each module															
															- await child controller & provider beforeApplicationShutdown() methods
															- await module beforeApplicationShutdown() method

Stop listeners								For HTTP server, WS server, each microservice:
															 - await connection termination

onApplicationShutdown					For each module															
															- await child controller & provider onApplicationShutdown() methods
															- await module onApplicationShutdown() method

Process exits															

*/

/**
 * LifeCycle hook method								Lifecycle event triggering the hook method call
 *
 * onModuleInit()										Called once the host module's dependencies have been resolved.
 *
 * onApplicationBootstrap()					Called once all modules have been initialized, but before listening for connections.
 *
 * onModuleDestroy()								Called after a termination signal (e.g., SIGTERM ) has been received.
 *
 * beforeApplicationShutdown()			Called after all onModuleDestroy() handlers have completed (Promises resolved or rejected);
 * 																	once complete (Promises resolved or rejected), all existing connections will be closed
 * 																	( app.close() called).
 *
 * onApplicationShutdown()					Called after connections close( app.close() resolves.)
 */
