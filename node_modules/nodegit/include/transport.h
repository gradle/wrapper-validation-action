// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTRANSPORT_H
#define GITTRANSPORT_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
#include <git2/sys/transport.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitTransport;

struct GitTransportTraits {
  typedef GitTransport cppClass;
  typedef git_transport cType;

  static const bool isDuplicable = false;
  static void duplicate(git_transport **dest, git_transport *src) {
     Nan::ThrowError("duplicate called on GitTransport which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_transport *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitTransport : public
  NodeGitWrapper<GitTransportTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTransportTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitTransport()
      : NodeGitWrapper<GitTransportTraits>(
           "A new GitTransport cannot be instantiated."
       )
    {}
    GitTransport(git_transport *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTransportTraits>(raw, selfFreeing, owner)
    {}
    ~GitTransport();
 };

#endif
